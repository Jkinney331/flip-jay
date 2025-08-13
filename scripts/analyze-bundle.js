#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes the Next.js bundle size and provides recommendations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BundleAnalyzer {
  constructor() {
    this.buildDir = path.join(process.cwd(), '.next');
    this.results = {
      totalSize: 0,
      bundles: [],
      recommendations: [],
      largestDependencies: [],
    };
  }

  async analyze() {
    console.log('🔍 Starting bundle analysis...\n');
    
    // Check if build exists
    if (!fs.existsSync(this.buildDir)) {
      console.error('❌ No build found. Please run "npm run build" first.');
      process.exit(1);
    }

    // Analyze build output
    this.analyzeBuildManifest();
    this.analyzeChunks();
    this.findLargeDependencies();
    this.generateRecommendations();
    this.printReport();
  }

  analyzeBuildManifest() {
    const manifestPath = path.join(this.buildDir, 'build-manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      
      // Analyze pages
      Object.entries(manifest.pages).forEach(([page, assets]) => {
        const pageSize = this.calculateAssetsSize(assets);
        this.results.bundles.push({
          name: page,
          type: 'page',
          size: pageSize,
          assets: assets.length,
        });
      });
    }
  }

  analyzeChunks() {
    const chunksDir = path.join(this.buildDir, 'static', 'chunks');
    if (fs.existsSync(chunksDir)) {
      const chunks = fs.readdirSync(chunksDir);
      
      chunks.forEach(chunk => {
        if (chunk.endsWith('.js')) {
          const chunkPath = path.join(chunksDir, chunk);
          const stats = fs.statSync(chunkPath);
          const sizeInKB = stats.size / 1024;
          
          this.results.bundles.push({
            name: chunk,
            type: 'chunk',
            size: sizeInKB,
            gzipped: this.estimateGzipSize(sizeInKB),
          });
          
          this.results.totalSize += sizeInKB;
        }
      });
    }
  }

  findLargeDependencies() {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const largeDeps = [
      { name: 'three', threshold: 500, actual: 0 },
      { name: 'react-dom', threshold: 130, actual: 0 },
      { name: '@radix-ui', threshold: 50, actual: 0 },
      { name: 'motion', threshold: 100, actual: 0 },
      { name: 'lucide-react', threshold: 60, actual: 0 },
    ];

    // Check for large dependencies
    Object.keys(packageJson.dependencies || {}).forEach(dep => {
      largeDeps.forEach(largeDep => {
        if (dep.includes(largeDep.name)) {
          this.results.largestDependencies.push({
            name: dep,
            impact: 'high',
            recommendation: `Consider lazy loading or code splitting for ${dep}`,
          });
        }
      });
    });
  }

  calculateAssetsSize(assets) {
    return assets.reduce((total, asset) => {
      const assetPath = path.join(this.buildDir, asset);
      if (fs.existsSync(assetPath)) {
        const stats = fs.statSync(assetPath);
        return total + (stats.size / 1024);
      }
      return total;
    }, 0);
  }

  estimateGzipSize(sizeInKB) {
    // Rough estimation: gzip typically achieves 70-80% compression for JS
    return sizeInKB * 0.3;
  }

  generateRecommendations() {
    const recs = this.results.recommendations;
    
    // Check total bundle size
    if (this.results.totalSize > 1000) {
      recs.push({
        severity: 'critical',
        message: `Total bundle size (${this.results.totalSize.toFixed(2)}KB) exceeds 1MB. Implement code splitting.`,
        action: 'Use dynamic imports for heavy components',
      });
    }

    // Check for large individual chunks
    this.results.bundles.forEach(bundle => {
      if (bundle.size > 300) {
        recs.push({
          severity: 'high',
          message: `${bundle.name} is ${bundle.size.toFixed(2)}KB (too large)`,
          action: 'Split this bundle or lazy load its contents',
        });
      }
    });

    // Check for framework chunks
    const frameworkChunk = this.results.bundles.find(b => b.name.includes('framework'));
    if (frameworkChunk && frameworkChunk.size > 150) {
      recs.push({
        severity: 'medium',
        message: 'Framework bundle is large',
        action: 'Consider using Preact in production or optimize React imports',
      });
    }

    // Three.js specific check
    const threeChunk = this.results.bundles.find(b => 
      b.name.toLowerCase().includes('three') || 
      b.name.includes('globe') ||
      b.name.includes('webgl')
    );
    if (threeChunk && threeChunk.size > 200) {
      recs.push({
        severity: 'high',
        message: 'Three.js/WebGL bundle detected',
        action: 'Implement dynamic import with loading state for 3D components',
      });
    }

    // Check for duplicate modules
    if (this.results.bundles.length > 20) {
      recs.push({
        severity: 'medium',
        message: 'High number of chunks detected',
        action: 'Review webpack configuration for better chunk optimization',
      });
    }
  }

  printReport() {
    console.log('📊 Bundle Analysis Report');
    console.log('=' .repeat(50));
    
    // Summary
    console.log('\n📦 Summary:');
    console.log(`  Total Size: ${this.results.totalSize.toFixed(2)}KB`);
    console.log(`  Total Chunks: ${this.results.bundles.length}`);
    console.log(`  Estimated Gzipped: ${(this.results.totalSize * 0.3).toFixed(2)}KB`);
    
    // Largest bundles
    console.log('\n🏋️ Largest Bundles:');
    const sortedBundles = this.results.bundles
      .sort((a, b) => b.size - a.size)
      .slice(0, 5);
    
    sortedBundles.forEach(bundle => {
      const indicator = bundle.size > 300 ? '🔴' : bundle.size > 150 ? '🟡' : '🟢';
      console.log(`  ${indicator} ${bundle.name}: ${bundle.size.toFixed(2)}KB`);
    });
    
    // Large dependencies
    if (this.results.largestDependencies.length > 0) {
      console.log('\n⚠️  Large Dependencies Detected:');
      this.results.largestDependencies.forEach(dep => {
        console.log(`  - ${dep.name}: ${dep.recommendation}`);
      });
    }
    
    // Recommendations
    if (this.results.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      
      const critical = this.results.recommendations.filter(r => r.severity === 'critical');
      const high = this.results.recommendations.filter(r => r.severity === 'high');
      const medium = this.results.recommendations.filter(r => r.severity === 'medium');
      
      if (critical.length > 0) {
        console.log('\n  🚨 Critical:');
        critical.forEach(rec => {
          console.log(`    - ${rec.message}`);
          console.log(`      Action: ${rec.action}`);
        });
      }
      
      if (high.length > 0) {
        console.log('\n  ⚠️  High Priority:');
        high.forEach(rec => {
          console.log(`    - ${rec.message}`);
          console.log(`      Action: ${rec.action}`);
        });
      }
      
      if (medium.length > 0) {
        console.log('\n  📝 Medium Priority:');
        medium.forEach(rec => {
          console.log(`    - ${rec.message}`);
          console.log(`      Action: ${rec.action}`);
        });
      }
    }
    
    // Performance Budget Status
    console.log('\n📈 Performance Budget Status:');
    const budgets = [
      { name: 'JS (Initial)', current: this.results.totalSize, limit: 500, unit: 'KB' },
      { name: 'JS (Gzipped)', current: this.results.totalSize * 0.3, limit: 150, unit: 'KB' },
      { name: 'Chunks', current: this.results.bundles.length, limit: 15, unit: 'files' },
    ];
    
    budgets.forEach(budget => {
      const status = budget.current <= budget.limit ? '✅' : '❌';
      const percentage = ((budget.current / budget.limit) * 100).toFixed(0);
      console.log(`  ${status} ${budget.name}: ${budget.current.toFixed(0)}${budget.unit} / ${budget.limit}${budget.unit} (${percentage}%)`);
    });
    
    // Next steps
    console.log('\n🚀 Next Steps:');
    console.log('  1. Run "npm run build && npm run analyze" to see visual bundle analysis');
    console.log('  2. Implement dynamic imports for components > 50KB');
    console.log('  3. Review and optimize Three.js imports');
    console.log('  4. Consider implementing route-based code splitting');
    console.log('  5. Set up continuous bundle size monitoring in CI/CD');
    
    // Export JSON report
    const reportPath = path.join(process.cwd(), 'bundle-analysis.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }
}

// Run the analyzer
const analyzer = new BundleAnalyzer();
analyzer.analyze().catch(console.error);