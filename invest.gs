/**
 * Weekly Portfolio Report Email Script
 * 
 * Automatically sends a weekly email report summarizing your investment portfolio
 * 
 * Features:
 * - Current portfolio value by asset type
 * - Week-over-week comparison (value changes)
 * - Asset allocation breakdown
 * - Top 5 largest holdings
 * - Summary statistics
 * 
 * Setup:
 * 1. Copy this script into your Google Sheet's Apps Script (Extensions > Apps Script)
 * 2. Update CONFIG section with your preferences
 * 3. Set up a weekly trigger:
 *    - Click Triggers (clock icon)
 *    - Add Trigger
 *    - Function: sendWeeklyPortfolioReport
 *    - Event source: Time-driven
 *    - Type: Week timer
 *    - Day: Monday (or your preference)
 *    - Time: 8am-9am (or your preference)
 * 4. First run: Manually run sendWeeklyPortfolioReport to authorize permissions
 */

// ===== CONFIGURATION =====
var CONFIG = {
  EMAIL_TO: 'yusufajarmoekti@gmail.com',
  SPREADSHEET_ID: '1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg',
  SHEET_NAME: 'asset', // Change to your actual sheet name
  HISTORY_SHEET_NAME: 'Portfolio_History', // Will be auto-created
  
  // Column indexes (1-based)
  COL_TIMESTAMP: 1,  // A
  COL_ASSET_ID: 2,   // B
  COL_ASSET_NAME: 3, // C
  COL_AMOUNT: 4,     // D
  COL_ASSET_TYPE: 5, // E
  COL_DESCRIPTION: 6 // F
};

/**
 * Helper function to get the spreadsheet
 * Works for both standalone and bound scripts
 */
function getSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID) {
    // Standalone script - use spreadsheet ID
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  } else {
    // Bound script - use active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error('SPREADSHEET_ID not configured. Please add your spreadsheet ID to CONFIG.');
    }
    return ss;
  }
}

/**
 * Main function to send weekly portfolio report
 */
function sendWeeklyPortfolioReport() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      Logger.log('Sheet not found: ' + CONFIG.SHEET_NAME);
      return;
    }
    
    // Get current portfolio data
    var currentData = getPortfolioData(sheet);
    
    // Save snapshot to history
    savePortfolioSnapshot(ss, currentData);
    
    // Get previous week's data for comparison
    var previousData = getPreviousWeekData(ss);
    
    // Generate report
    var emailBody = generateEmailReport(currentData, previousData, ss);
    
    // Send email
    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: 'Weekly Portfolio Report - ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM dd, yyyy'),
      htmlBody: emailBody
    });
    
    Logger.log('Weekly portfolio report sent successfully to ' + CONFIG.EMAIL_TO);
    
  } catch (error) {
    Logger.log('Error in sendWeeklyPortfolioReport: ' + error.toString());
    
    // Send error notification
    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: 'Portfolio Report Error',
      body: 'Failed to generate weekly portfolio report.\n\nError: ' + error.toString()
    });
  }
}

/**
 * Get current portfolio data from sheet
 * Only uses the latest timestamp entry for each unique asset (ID + Name combination)
 */
function getPortfolioData(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null; // No data
  
  var data = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
  
  // First pass: Find the latest timestamp for each unique asset (ID + Name)
  var latestByAsset = {};
  
  data.forEach(function(row) {
    if (!row[CONFIG.COL_AMOUNT - 1]) return; // Skip empty rows
    
    var assetId = row[CONFIG.COL_ASSET_ID - 1] || 'Unknown';
    var assetName = row[CONFIG.COL_ASSET_NAME - 1] || 'Unknown';
    var timestamp = row[CONFIG.COL_TIMESTAMP - 1];
    
    // Create unique key from asset_id and asset_name
    var assetKey = assetId + '|' + assetName;
    
    // Convert to timestamp for comparison
    var rowTimestamp = timestamp ? new Date(timestamp).getTime() : 0;
    
    // Keep only the latest entry for each unique asset
    if (!latestByAsset[assetKey] || rowTimestamp > latestByAsset[assetKey].timestamp) {
      latestByAsset[assetKey] = {
        timestamp: rowTimestamp,
        row: row,
        assetId: assetId
      };
    }
  });
  
  // Second pass: Build portfolio from latest entries only
  var portfolio = {
    timestamp: new Date(),
    totalValue: 0,
    assets: [],
    byType: {},
    byId: {}
  };
  
  Object.keys(latestByAsset).forEach(function(assetKey) {
    var row = latestByAsset[assetKey].row;
    var assetId = latestByAsset[assetKey].assetId;
    
    var amount = parseFloat(row[CONFIG.COL_AMOUNT - 1]) || 0;
    var assetType = row[CONFIG.COL_ASSET_TYPE - 1] || 'Unknown';
    
    var asset = {
      timestamp: row[CONFIG.COL_TIMESTAMP - 1],
      id: assetId,
      name: row[CONFIG.COL_ASSET_NAME - 1],
      amount: amount,
      type: assetType,
      description: row[CONFIG.COL_DESCRIPTION - 1]
    };
    
    portfolio.assets.push(asset);
    portfolio.totalValue += amount;
    
    // Group by type
    if (!portfolio.byType[assetType]) {
      portfolio.byType[assetType] = { total: 0, count: 0, assets: [] };
    }
    portfolio.byType[assetType].total += amount;
    portfolio.byType[assetType].count++;
    portfolio.byType[assetType].assets.push(asset);
    
    // Group by ID (can have multiple entries per ID if names differ)
    if (!portfolio.byId[assetId]) {
      portfolio.byId[assetId] = { total: 0, count: 0 };
    }
    portfolio.byId[assetId].total += amount;
    portfolio.byId[assetId].count++;
  });
  
  return portfolio;
}

/**
 * Save current portfolio snapshot to history sheet
 */
function savePortfolioSnapshot(ss, portfolio) {
  if (!portfolio) return;
  
  var historySheet = ss.getSheetByName(CONFIG.HISTORY_SHEET_NAME);
  
  // Create history sheet if it doesn't exist
  if (!historySheet) {
    historySheet = ss.insertSheet(CONFIG.HISTORY_SHEET_NAME);
    historySheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Total Value', 'Asset Count', 'Breakdown', 'Asset Details']]);
    historySheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  
  var breakdown = JSON.stringify(portfolio.byType);
  var assetDetails = JSON.stringify(portfolio.byId);
  historySheet.appendRow([
    new Date(),
    portfolio.totalValue,
    portfolio.assets.length,
    breakdown,
    assetDetails
  ]);
}

/**
 * Get previous week's portfolio data from history
 */
function getPreviousWeekData(ss) {
  var historySheet = ss.getSheetByName(CONFIG.HISTORY_SHEET_NAME);
  if (!historySheet) return null;
  
  var lastRow = historySheet.getLastRow();
  if (lastRow < 3) return null; // Need at least 2 data rows
  
  // Get second to last row (previous week)
  var data = historySheet.getRange(lastRow - 1, 1, 1, 4).getValues()[0];
  
  return {
    timestamp: data[0],
    totalValue: data[1],
    assetCount: data[2],
    byType: JSON.parse(data[3])
  };
}

/**
 * Generate HTML email report
 */
function generateEmailReport(current, previous, ss) {
  if (!current) {
    return '<p>No portfolio data available.</p>';
  }
  
  var html = [];
  
  // Header
  html.push('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>');
  html.push('body { font-family: "Segoe UI", Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 900px; margin: 0 auto; padding: 20px; }');
  html.push('h2 { color: #1a1a1a; border-bottom: 2px solid #4a4a4a; padding-bottom: 10px; font-size: 24px; margin-bottom: 10px; }');
  html.push('h3 { color: #333; margin-top: 36px; margin-bottom: 12px; font-size: 18px; font-weight: 600; border-left: 4px solid #3b82f6; padding-left: 12px; }');
  html.push('h4 { color: #555; margin-top: 20px; margin-bottom: 10px; font-size: 14px; font-weight: 600; }');
  html.push('table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 13px; overflow-x: auto; }');
  html.push('th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }');
  html.push('th { background-color: #f5f5f5; color: #333; font-weight: 600; white-space: nowrap; }');
  html.push('tr:hover { background-color: #fafafa; }');
  html.push('.positive { color: #16a34a; font-weight: 500; }');
  html.push('.negative { color: #dc2626; font-weight: 500; }');
  html.push('.neutral { color: #666; }');
  html.push('.positive-bg { background-color: #f0fdf4; }');
  html.push('.negative-bg { background-color: #fef2f2; }');
  html.push('.summary-box { background: linear-gradient(to right, #f8f9fa 0%, #ffffff 100%); padding: 24px; border-left: 4px solid #4a4a4a; margin: 24px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }');
  html.push('.highlight-box { background: #fef3c7; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }');
  html.push('.metric { display: inline-block; margin: 0 32px 12px 0; vertical-align: top; min-width: 150px; }');
  html.push('.metric-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }');
  html.push('.metric-value { font-size: 22px; font-weight: 600; color: #1a1a1a; line-height: 1.2; }');
  html.push('.metric-subtext { font-size: 11px; color: #999; margin-top: 4px; }');
  html.push('.report-date { color: #666; font-size: 13px; margin-bottom: 28px; }');
  html.push('.bar-chart { display: inline-block; background: #3b82f6; height: 24px; margin-right: 10px; vertical-align: middle; border-radius: 2px; transition: all 0.3s; }');
  html.push('.info-text { color: #666; font-size: 12px; font-style: italic; margin: 10px 0; padding-left: 4px; }');
  html.push('.section-summary { background: #f9fafb; padding: 14px 16px; border-radius: 6px; margin: 12px 0; font-size: 13px; border-left: 3px solid #3b82f6; }');
  html.push('.trend-label { display: inline-block; font-size: 10px; color: #999; text-transform: uppercase; margin-left: 4px; padding: 2px 6px; background: #f0f0f0; border-radius: 3px; }');
  html.push('.divider { margin: 32px 0; border: none; border-top: 1px solid #e0e0e0; }');
  html.push('@media only screen and (max-width: 600px) {');
  html.push('  body { padding: 12px; }');
  html.push('  .metric { display: block; margin: 0 0 16px 0; }');
  html.push('  table { font-size: 11px; }');
  html.push('  th, td { padding: 8px 6px; }');
  html.push('  h2 { font-size: 20px; }');
  html.push('  h3 { font-size: 16px; }');
  html.push('}');
  html.push('</style></head><body>');
  
  html.push('<h2>Weekly Portfolio Report</h2>');
  html.push('<p class="report-date">Report Date: ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM dd, yyyy') + '</p>');
  
  // Executive Summary
  html.push('<div class="summary-box">');
  html.push('<h3 style="margin-top: 0; border-left: none; padding-left: 0;">Executive Summary</h3>');
  html.push('<div class="metric">');
  html.push('<div class="metric-label">Total Portfolio Value</div>');
  html.push('<div class="metric-value">Rp ' + formatCompactNumber(current.totalValue) + '</div>');
  html.push('<div class="metric-subtext">Rp ' + formatNumber(current.totalValue) + '</div>');
  html.push('</div>');
  
  html.push('<div class="metric">');
  html.push('<div class="metric-label">Total Assets</div>');
  html.push('<div class="metric-value">' + current.assets.length + '</div>');
  html.push('<div class="metric-subtext">' + Object.keys(current.byType).length + ' asset types</div>');
  html.push('</div>');
  
  // Week-over-week change
  if (previous) {
    var valueChange = current.totalValue - previous.totalValue;
    var percentChange = (valueChange / previous.totalValue) * 100;
    var changeClass = valueChange > 0 ? 'positive' : (valueChange < 0 ? 'negative' : 'neutral');
    var changeSymbol = valueChange > 0 ? '+' : '';
    var changeText = valueChange > 0 ? 'increased' : (valueChange < 0 ? 'decreased' : 'unchanged');
    
    html.push('<div class="metric">');
    html.push('<div class="metric-label">Week-over-Week Change</div>');
    html.push('<div class="metric-value ' + changeClass + '">' + changeSymbol + 'Rp ' + formatCompactNumber(Math.abs(valueChange)) + '</div>');
    html.push('<div class="metric-subtext ' + changeClass + '">' + changeSymbol + percentChange.toFixed(1) + '% • ' + changeSymbol + 'Rp ' + formatNumber(Math.abs(valueChange)) + '</div>');
    html.push('</div>');
    
    // Add interpretation
    html.push('</div>'); // Close summary-box
    html.push('<div class="highlight-box">');
    html.push('<strong>Key Insight:</strong> Your portfolio has ' + changeText + ' by <span class="' + changeClass + '">' + changeSymbol + 'Rp ' + formatNumber(Math.abs(valueChange)) + '</span> compared to last week. ');
    if (Math.abs(percentChange) > 10) {
      html.push('This is a significant change of ' + Math.abs(percentChange).toFixed(1) + '%.');
    } else if (Math.abs(percentChange) > 5) {
      html.push('This represents a moderate change of ' + Math.abs(percentChange).toFixed(1) + '%.');
    } else {
      html.push('Your portfolio is relatively stable with a ' + Math.abs(percentChange).toFixed(1) + '% change.');
    }
    html.push('</div>');
  } else {
    html.push('</div>');
    html.push('<p class="info-text">Note: Week-over-week comparison will be available after the first week of tracking.</p>');
  }
  
  html.push('<hr class="divider">');
  
  // Asset allocation by type
  html.push('<h3>Asset Allocation by Type</h3>');
  html.push('<p class="info-text">How your portfolio is distributed across different asset categories</p>');
  
  // Visual allocation bars with improved design
  html.push('<div style="margin: 20px 0; padding: 16px; background: #fafafa; border-radius: 6px;">');
  var sortedTypes = Object.keys(current.byType).sort(function(a, b) {
    return current.byType[b].total - current.byType[a].total;
  });
  
  sortedTypes.forEach(function(type) {
    var typeData = current.byType[type];
    var allocation = (typeData.total / current.totalValue) * 100;
    var barWidth = Math.max(allocation * 5, 10);
    
    html.push('<div style="margin-bottom: 16px; padding: 10px; background: white; border-radius: 4px;">');
    html.push('<div style="margin-bottom: 8px;">');
    html.push('<span style="font-weight: 600; font-size: 14px;">' + type + '</span>');
    html.push('<span style="font-weight: 600; color: #3b82f6; font-size: 14px; float: right;">' + allocation.toFixed(1) + '%</span>');
    html.push('</div>');
    html.push('<div style="clear: both; margin-bottom: 8px;">');
    html.push('<div class="bar-chart" style="width: ' + barWidth + 'px; max-width: 100%; height: 20px;"></div>');
    html.push('</div>');
    html.push('<div style="font-size: 12px; color: #666;">');
    html.push('Rp ' + formatCompactNumber(typeData.total) + ' • ' + typeData.count + ' asset' + (typeData.count > 1 ? 's' : ''));
    html.push('</div>');
    html.push('</div>');
  });
  html.push('</div>');
  
  // Detailed table
  html.push('<table>');
  html.push('<tr><th>Asset Type</th><th>Value (Rp)</th><th>Count</th><th>Allocation %</th><th>Change vs Last Week</th></tr>');
  
  for (var type in current.byType) {
    var typeData = current.byType[type];
    var allocation = (typeData.total / current.totalValue) * 100;
    
    var changeText = '-';
    var rowClass = '';
    if (previous && previous.byType[type]) {
      var prevValue = previous.byType[type].total;
      var typeChange = typeData.total - prevValue;
      var typeChangePercent = (typeChange / prevValue) * 100;
      var changeClass = typeChange > 0 ? 'positive' : (typeChange < 0 ? 'negative' : 'neutral');
      rowClass = typeChange > 0 ? 'positive-bg' : (typeChange < 0 ? 'negative-bg' : '');
      var changeSymbol = typeChange > 0 ? '+' : '';
      changeText = '<span class="' + changeClass + '">' + changeSymbol + formatNumber(typeChange) + ' (' + changeSymbol + typeChangePercent.toFixed(1) + '%)</span>';
    }
    
    html.push('<tr class="' + rowClass + '">');
    html.push('<td><strong>' + type + '</strong></td>');
    html.push('<td>Rp ' + formatCompactNumber(typeData.total) + '<br><span style="font-size: 10px; color: #999;">' + formatNumber(typeData.total) + '</span></td>');
    html.push('<td>' + typeData.count + ' asset' + (typeData.count > 1 ? 's' : '') + '</td>');
    html.push('<td><strong>' + allocation.toFixed(1) + '%</strong></td>');
    html.push('<td>' + changeText + '</td>');
    html.push('</tr>');
  }
  html.push('</table>');
  
  // Summary insight
  var largestType = Object.keys(current.byType).reduce(function(a, b) { 
    return current.byType[a].total > current.byType[b].total ? a : b;
  });
  var largestAllocation = (current.byType[largestType].total / current.totalValue) * 100;
  html.push('<div class="section-summary">');
  html.push('<strong>Allocation Summary:</strong> Your largest allocation is in <strong>' + largestType + '</strong> (' + largestAllocation.toFixed(1) + '% of total portfolio). ');
  html.push('You have <strong>' + Object.keys(current.byType).length + '</strong> different asset types.');
  html.push('</div>');
  
  html.push('<hr class="divider">');
  
  // Top 5 holdings
  html.push('<h3>Top Holdings</h3>');
  html.push('<p class="info-text">Your 5 largest assets by value</p>');
  var sortedAssets = current.assets.slice().sort(function(a, b) { return b.amount - a.amount; });
  
  // Visual representation
  html.push('<div style="margin: 20px 0;">');
  var topFiveTotal = 0;
  for (var i = 0; i < Math.min(5, sortedAssets.length); i++) {
    topFiveTotal += sortedAssets[i].amount;
  }
  var topFivePercent = (topFiveTotal / current.totalValue) * 100;
  html.push('<div class="section-summary">');
  html.push('Your top 5 holdings represent <strong>Rp ' + formatNumber(topFiveTotal) + '</strong> (' + topFivePercent.toFixed(1) + '% of total portfolio)');
  html.push('</div>');
  html.push('</div>');
  
  html.push('<table>');
  html.push('<tr><th>Rank</th><th>Asset Name</th><th>Type</th><th>Value (Rp)</th><th>% of Portfolio</th></tr>');
  
  for (var i = 0; i < Math.min(5, sortedAssets.length); i++) {
    var asset = sortedAssets[i];
    var percentage = (asset.amount / current.totalValue) * 100;
    var rankBadgeColor = i === 0 ? '#f59e0b' : (i === 1 ? '#94a3b8' : (i === 2 ? '#cd7f32' : '#e5e7eb'));
    html.push('<tr>');
    html.push('<td><span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; background: ' + rankBadgeColor + '; color: white; border-radius: 50%; font-weight: bold; font-size: 11px;">' + (i + 1) + '</span></td>');
    html.push('<td><strong>' + asset.name + '</strong><br><span style="font-size: 11px; color: #999;">' + asset.type + '</span></td>');
    html.push('<td>' + asset.type + '</td>');
    html.push('<td><strong>Rp ' + formatCompactNumber(asset.amount) + '</strong><br><span style="font-size: 10px; color: #999;">' + formatNumber(asset.amount) + '</span></td>');
    html.push('<td><strong>' + percentage.toFixed(1) + '%</strong></td>');
    html.push('</tr>');
  }
  html.push('</table>');
  
  // Historical trend chart
  html.push('<h3>Portfolio Trend</h3>');
  html.push('<p class="info-text">Track how your total portfolio value has changed over time</p>');
  var trendData = getHistoricalTrend(ss, 8); // Last 8 weeks
  if (trendData && trendData.length > 1) {
    html.push(generateTrendChart(trendData));
  } else {
    html.push('<div class="section-summary">Historical trend will be available after multiple weeks of data collection.</div>');
  }
  
  html.push('<hr class="divider">');
  
  // Detailed asset list by type
  html.push('<h3>Detailed Holdings</h3>');
  html.push('<p class="info-text">Complete list of all assets organized by type</p>');
  for (var type in current.byType) {
    html.push('<h4>' + type + ' (' + current.byType[type].count + ' asset' + (current.byType[type].count > 1 ? 's' : '') + ')</h4>');
    html.push('<table>');
    html.push('<tr><th>Asset Name</th><th>Description</th><th>Value (Rp)</th><th>Last Updated</th></tr>');
    
    current.byType[type].assets.forEach(function(asset) {
      var timestamp = asset.timestamp ? Utilities.formatDate(new Date(asset.timestamp), Session.getScriptTimeZone(), 'MMM dd, yyyy HH:mm') : 'N/A';
      html.push('<tr>');
      html.push('<td><strong>' + asset.name + '</strong></td>');
      html.push('<td>' + (asset.description || '-') + '</td>');
      html.push('<td><strong>Rp ' + formatCompactNumber(asset.amount) + '</strong><br><span style="font-size: 10px; color: #999;">' + formatNumber(asset.amount) + '</span></td>');
      html.push('<td style="font-size: 11px; color: #666;">' + timestamp + '</td>');
      html.push('</tr>');
    });
    
    html.push('</table>');
  }
  
  // Footer
  html.push('<hr style="margin-top: 40px; border: none; border-top: 1px solid #e0e0e0;">');
  html.push('<p style="color: #666; font-size: 11px; line-height: 1.5;">');
  html.push('This report is generated automatically from your Investment Tracker spreadsheet. ');
  html.push('Data reflects the latest entries as of ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM dd, yyyy HH:mm z') + '.');
  html.push('</p>');
  
  html.push('</body></html>');
  
  return html.join('\n');
}

/**
 * Format number with thousand separators
 */
function formatNumber(num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format number in compact form (millions/thousands)
 */
function formatCompactNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

/**
 * Format date intelligently based on context
 */
function formatSmartDate(date, index, totalItems) {
  var d = new Date(date);
  var now = new Date();
  var daysDiff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  
  // If same day but multiple entries, show time
  if (daysDiff === 0 && totalItems > 1) {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'HH:mm');
  }
  
  // If within a week, show day name
  if (daysDiff < 7) {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'EEE');
  }
  
  // Otherwise show date
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'MMM dd');
}

/**
 * Get historical trend data for charting
 */
function getHistoricalTrend(ss, weeks) {
  var historySheet = ss.getSheetByName(CONFIG.HISTORY_SHEET_NAME);
  if (!historySheet) return null;
  
  var lastRow = historySheet.getLastRow();
  if (lastRow < 2) return null;
  
  var startRow = Math.max(2, lastRow - weeks + 1);
  var numRows = lastRow - startRow + 1;
  var data = historySheet.getRange(startRow, 1, numRows, 2).getValues();
  
  return data.map(function(row) {
    return {
      date: row[0],
      value: row[1]
    };
  });
}

/**
 * Generate ASCII/HTML trend chart
 */
function generateTrendChart(trendData) {
  var html = [];
  
  html.push('<div style="background: #f9fafb; padding: 20px; border-radius: 4px; margin: 15px 0;">');
  
  // Calculate min/max for scaling
  var values = trendData.map(function(d) { return d.value; });
  var minValue = Math.min.apply(null, values);
  var maxValue = Math.max.apply(null, values);
  var range = maxValue - minValue;
  
  // Simple bar chart with improved design
  html.push('<div style="margin-bottom: 15px;">');
  trendData.forEach(function(point, index) {
    var date = formatSmartDate(point.date, index, trendData.length);
    var percentage = range > 0 ? ((point.value - minValue) / range) * 100 : 50;
    var barWidth = Math.max(percentage * 5, 15);
    
    var colorClass = 'neutral';
    var trendLabel = '';
    if (index > 0) {
      var prevValue = trendData[index - 1].value;
      colorClass = point.value > prevValue ? 'positive' : (point.value < prevValue ? 'negative' : 'neutral');
      if (point.value > prevValue) {
        trendLabel = '↑';
      } else if (point.value < prevValue) {
        trendLabel = '↓';
      }
    }
    
    var isLatest = index === trendData.length - 1;
    var isPrevious = index === trendData.length - 2;
    
    html.push('<div style="margin-bottom: 12px; padding: 8px; background: ' + (isLatest ? '#f0f9ff' : 'transparent') + '; border-radius: 4px;">');
    html.push('<div style="display: table; width: 100%;">');
    html.push('<div style="display: table-cell; width: 100px; vertical-align: middle; font-size: 11px; color: #666; font-weight: ' + (isLatest ? '600' : '400') + ';">');
    html.push(date);
    if (isLatest) html.push('<br><span class="trend-label">Latest</span>');
    if (isPrevious) html.push('<br><span class="trend-label">Previous</span>');
    html.push('</div>');
    html.push('<div style="display: table-cell; vertical-align: middle;">');
    html.push('<div class="bar-chart ' + colorClass + '" style="width: ' + barWidth + 'px; max-width: 400px; height: 24px; background: ' + 
              (colorClass === 'positive' ? '#16a34a' : (colorClass === 'negative' ? '#dc2626' : '#3b82f6')) + ';"></div>');
    html.push('</div>');
    html.push('<div style="display: table-cell; width: 150px; vertical-align: middle; padding-left: 10px;">');
    html.push('<span style="font-size: 13px; font-weight: ' + (isLatest ? '600' : '400') + ';">Rp ' + formatCompactNumber(point.value) + '</span>');
    if (trendLabel) {
      html.push('<span style="margin-left: 6px; color: ' + (colorClass === 'positive' ? '#16a34a' : '#dc2626') + '; font-size: 14px;">' + trendLabel + '</span>');
    }
    html.push('</div>');
    html.push('</div>');
    html.push('</div>');
  });
  html.push('</div>');
  
  // Summary
  var firstValue = trendData[0].value;
  var lastValue = trendData[trendData.length - 1].value;
  var totalChange = lastValue - firstValue;
  var totalChangePercent = (totalChange / firstValue) * 100;
  var changeClass = totalChange > 0 ? 'positive' : (totalChange < 0 ? 'negative' : 'neutral');
  var changeSymbol = totalChange > 0 ? '+' : '';
  
  html.push('<div class="section-summary">');
  html.push('<strong>Trend Summary:</strong> Over the last ' + trendData.length + ' week' + (trendData.length > 1 ? 's' : '') + ', ');
  html.push('your portfolio has <span class="' + changeClass + '">' + (totalChange > 0 ? 'grown' : (totalChange < 0 ? 'decreased' : 'remained stable')) + '</span> by ');
  html.push('<strong class="' + changeClass + '">' + changeSymbol + 'Rp ' + formatNumber(Math.abs(totalChange)) + ' (' + changeSymbol + totalChangePercent.toFixed(1) + '%)</strong>');
  html.push('</div>');
  
  html.push('</div>');
  
  return html.join('\n');
}

/**
 * Manual test function - run this to test the email report
 */
function testWeeklyReport() {
  sendWeeklyPortfolioReport();
}

/**
 * Saturday Reminder Script
 * 
 * Sends a reminder email on Saturday to update your investment tracker
 * before the weekly report is sent on Sunday
 * 
 * Setup:
 * 1. Copy this script into your Google Sheet's Apps Script (same project as weekly_portfolio_report.gs)
 * 2. Set up a weekly trigger:
 *    - Click Triggers (clock icon)
 *    - Add Trigger
 *    - Function: sendSaturdayReminder
 *    - Event source: Time-driven
 *    - Type: Week timer
 *    - Day: Saturday
 *    - Time: 10am-11am (or your preference)
 * 3. First run: Manually run sendSaturdayReminder to authorize permissions
 */

// Use the same CONFIG from weekly_portfolio_report.gs
// If running in the same project, CONFIG is already available

/**
 * Send reminder email on Saturday to update the investment tracker
 */
function sendSaturdayReminder() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      Logger.log('Sheet not found: ' + CONFIG.SHEET_NAME);
      return;
    }
    
    // Get current portfolio summary
    var currentData = getPortfolioData(sheet);
    var historySheet = ss.getSheetByName(CONFIG.HISTORY_SHEET_NAME);
    
    // Check when last updated
    var lastUpdated = 'Not available';
    if (historySheet && historySheet.getLastRow() > 1) {
      var lastUpdateDate = historySheet.getRange(historySheet.getLastRow(), 1).getValue();
      lastUpdated = Utilities.formatDate(new Date(lastUpdateDate), Session.getScriptTimeZone(), 'EEEE, MMMM dd, yyyy HH:mm');
    }
    
    // Generate reminder email
    var emailBody = generateReminderEmail(currentData, lastUpdated);
    
    // Send email
    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: '⏰ Reminder: Update Your Investment Tracker',
      htmlBody: emailBody
    });
    
    Logger.log('Saturday reminder sent successfully to ' + CONFIG.EMAIL_TO);
    
  } catch (error) {
    Logger.log('Error in sendSaturdayReminder: ' + error.toString());
  }
}

/**
 * Generate reminder email HTML
 */
function generateReminderEmail(current, lastUpdated) {
  var html = [];
  
  html.push('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>');
  html.push('body { font-family: "Segoe UI", Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }');
  html.push('h2 { color: #1a1a1a; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; font-size: 22px; margin-bottom: 15px; }');
  html.push('.reminder-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }');
  html.push('.info-box { background: #f0f9ff; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 3px solid #3b82f6; }');
  html.push('.summary-item { margin: 12px 0; padding: 10px; background: white; border-radius: 4px; }');
  html.push('.label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }');
  html.push('.value { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-top: 4px; }');
  html.push('.button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }');
  html.push('.checklist { background: #f9fafb; padding: 16px; border-radius: 6px; margin: 15px 0; }');
  html.push('.checklist-item { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }');
  html.push('.checklist-item:last-child { border-bottom: none; }');
  html.push('</style></head><body>');
  
  html.push('<h2>⏰ Time to Update Your Investment Tracker!</h2>');
  
  html.push('<div class="reminder-box">');
  html.push('<p style="font-size: 16px; margin: 0 0 10px 0;"><strong>Reminder:</strong></p>');
  html.push('<p style="margin: 0;">Your weekly portfolio report will be sent <strong>tomorrow (Sunday)</strong>. ');
  html.push('Please update your investment tracker sheet with the latest values to ensure accurate reporting.</p>');
  html.push('</div>');
  
  // Current snapshot
  if (current) {
    html.push('<div class="info-box">');
    html.push('<p style="font-weight: 600; margin: 0 0 12px 0;">Current Portfolio Snapshot</p>');
    
    html.push('<div class="summary-item">');
    html.push('<div class="label">Total Portfolio Value</div>');
    html.push('<div class="value">Rp ' + formatCompactNumber(current.totalValue) + '</div>');
    html.push('<div style="font-size: 11px; color: #999; margin-top: 2px;">Rp ' + formatNumber(current.totalValue) + '</div>');
    html.push('</div>');
    
    html.push('<div class="summary-item">');
    html.push('<div class="label">Total Assets</div>');
    html.push('<div class="value">' + current.assets.length + ' assets</div>');
    html.push('<div style="font-size: 11px; color: #999; margin-top: 2px;">' + Object.keys(current.byType).length + ' asset types</div>');
    html.push('</div>');
    
    html.push('<div style="font-size: 12px; color: #666; margin-top: 12px; padding-top: 12px; border-top: 1px solid #bfdbfe;">');
    html.push('<strong>Last updated:</strong> ' + lastUpdated);
    html.push('</div>');
    
    html.push('</div>');
  }
  
  // Checklist
  html.push('<div class="checklist">');
  html.push('<p style="font-weight: 600; margin: 0 0 12px 0;">📋 Update Checklist</p>');
  html.push('<div class="checklist-item">☐ Check all bank account balances</div>');
  html.push('<div class="checklist-item">☐ Update investment/trading account values</div>');
  html.push('<div class="checklist-item">☐ Record any new deposits or withdrawals</div>');
  html.push('<div class="checklist-item">☐ Update asset descriptions if needed</div>');
  html.push('<div class="checklist-item">☐ Remove or mark any closed accounts</div>');
  html.push('</div>');
  
  // Quick access button
  html.push('<div style="text-align: center; margin: 25px 0;">');
  var sheetUrl = getSpreadsheet().getUrl();
  html.push('<a href="' + sheetUrl + '" class="button">Open Investment Tracker</a>');
  html.push('</div>');
  
  // Asset breakdown preview
  if (current && current.byType) {
    html.push('<div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">');
    html.push('<p style="font-size: 13px; color: #666; margin-bottom: 10px;">Current asset breakdown:</p>');
    
    var sortedTypes = Object.keys(current.byType).sort(function(a, b) {
      return current.byType[b].total - current.byType[a].total;
    });
    
    sortedTypes.forEach(function(type) {
      var typeData = current.byType[type];
      var allocation = (typeData.total / current.totalValue) * 100;
      html.push('<div style="font-size: 12px; color: #666; margin: 6px 0;">');
      html.push('<strong>' + type + ':</strong> Rp ' + formatCompactNumber(typeData.total) + ' (' + allocation.toFixed(1) + '%) • ' + typeData.count + ' asset' + (typeData.count > 1 ? 's' : ''));
      html.push('</div>');
    });
    
    html.push('</div>');
  }
  
  // Footer
  html.push('<hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">');
  html.push('<p style="color: #999; font-size: 11px; text-align: center; line-height: 1.5;">');
  html.push('This is an automated reminder from your Investment Tracker.<br>');
  html.push('Your weekly report will be sent on Sunday between 8-9am.');
  html.push('</p>');
  
  html.push('</body></html>');
  
  return html.join('\n');
}

/**
 * Manual test function - run this to test the reminder email
 */
function testSaturdayReminder() {
  sendSaturdayReminder();
}

/**
 * Auto-Timestamp Script
 * 
 * Automatically duplicates existing portfolio rows with fresh timestamps every Saturday at 18:00
 * This allows you to track historical portfolio snapshots week by week
 * 
 * Setup:
 * 1. This function is already included in your script
 * 2. Set up a weekly trigger:
 *    - Click Triggers (clock icon)
 *    - Add Trigger
 *    - Function: addWeeklyTimestampRows
 *    - Event source: Time-driven
 *    - Type: Week timer
 *    - Day: Saturday
 *    - Time: 6pm-7pm
 * 3. First run: Manually run addWeeklyTimestampRows to test
 */

/**
 * Append new rows with current timestamp based on existing data
 * Runs every Saturday at 18:00
 */
function addWeeklyTimestampRows() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      Logger.log('Sheet not found: ' + CONFIG.SHEET_NAME);
      return;
    }
    
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      Logger.log('No data rows found to duplicate');
      return;
    }
    
    // Get all existing data rows (excluding header)
    var dataRange = sheet.getRange(2, 1, lastRow - 1, 6);
    var existingData = dataRange.getValues();
    
    // Filter out rows that are empty (no asset name or amount)
    var validRows = [];
    var validRowIndexes = []; // Track original row numbers for copying formatting
    
    for (var i = 0; i < existingData.length; i++) {
      var row = existingData[i];
      if (row[CONFIG.COL_ASSET_NAME - 1] && row[CONFIG.COL_AMOUNT - 1]) {
        validRows.push(row);
        validRowIndexes.push(i + 2); // +2 because: 0-indexed array + skip header row
      }
    }
    
    if (validRows.length === 0) {
      Logger.log('No valid data rows found to duplicate');
      return;
    }
    
    // Get the most recent timestamp from existing data to avoid duplicating today's entries
    var mostRecentTimestamp = new Date(0); // Epoch
    validRows.forEach(function(row) {
      var rowTimestamp = new Date(row[CONFIG.COL_TIMESTAMP - 1]);
      if (rowTimestamp > mostRecentTimestamp) {
        mostRecentTimestamp = rowTimestamp;
      }
    });
    
    // Check if we already added timestamps today (avoid double-running)
    var now = new Date();
    var hoursDiff = (now - mostRecentTimestamp) / (1000 * 60 * 60);
    
    if (hoursDiff < 12) {
      Logger.log('Timestamps were recently added (less than 12 hours ago). Skipping to avoid duplicates.');
      Logger.log('Most recent timestamp: ' + mostRecentTimestamp);
      return;
    }
    
    // ===== DEDUPLICATION LOGIC =====
    // Keep only the most recent entry for each unique Asset ID + Asset Name combination
    var assetMap = {}; // Map of "AssetID|AssetName" -> {row data, original row index, timestamp, array index}
    
    for (var i = 0; i < validRows.length; i++) {
      var row = validRows[i];
      var assetId = row[CONFIG.COL_ASSET_ID - 1];
      var assetName = row[CONFIG.COL_ASSET_NAME - 1];
      var timestamp = new Date(row[CONFIG.COL_TIMESTAMP - 1]);
      
      // Create composite key: Asset ID + Asset Name
      var compositeKey = assetId + '|' + assetName;
      
      // If asset doesn't exist yet, or this entry is newer, keep it
      if (!assetMap[compositeKey] || timestamp > assetMap[compositeKey].timestamp) {
        assetMap[compositeKey] = {
          row: row,
          originalRowIndex: validRowIndexes[i],
          timestamp: timestamp,
          arrayIndex: i  // Store the array index to ensure we get the right formatting source
        };
      }
    }
    
    // Extract deduplicated rows
    var deduplicatedRows = [];
    var deduplicatedRowIndexes = [];
    
    for (var compositeKey in assetMap) {
      deduplicatedRows.push(assetMap[compositeKey].row);
      deduplicatedRowIndexes.push(assetMap[compositeKey].originalRowIndex);
    }
    
    Logger.log('Original valid rows: ' + validRows.length);
    Logger.log('Deduplicated rows: ' + deduplicatedRows.length);
    
    // Create new timestamp for all rows
    var currentTimestamp = new Date();
    
    // Prepare new rows with updated timestamp
    var newRows = deduplicatedRows.map(function(row) {
      return [
        currentTimestamp,                    // New timestamp
        row[CONFIG.COL_ASSET_ID - 1],       // Asset ID
        row[CONFIG.COL_ASSET_NAME - 1],     // Asset Name
        row[CONFIG.COL_AMOUNT - 1],         // Amount (keep same - user will update manually)
        row[CONFIG.COL_ASSET_TYPE - 1],     // Asset Type
        row[CONFIG.COL_DESCRIPTION - 1]     // Description
      ];
    });
    
    // Append new rows to the sheet
    var newRowCount = newRows.length;
    var appendRange = sheet.getRange(lastRow + 1, 1, newRowCount, 6);
    appendRange.setValues(newRows);
    
    // ===== COPY FORMATTING AND DATA VALIDATION =====
    // First, get a reference row that has dropdown (any valid row with data will do)
    var referenceRowWithDropdown = 2; // Row 2 should have the dropdown
    
    // Copy formatting from original rows to new rows (including dropdowns and timestamp format)
    for (var i = 0; i < newRowCount; i++) {
      var sourceRowNum = deduplicatedRowIndexes[i];
      var targetRowNum = lastRow + 1 + i;
      
      // Copy formatting for ALL columns including A (timestamp)
      for (var col = 1; col <= 6; col++) {
        var sourceCell = sheet.getRange(sourceRowNum, col);
        var targetCell = sheet.getRange(targetRowNum, col);
        
        // For dropdown column (E), always use reference row to ensure dropdown is copied
        if (col === CONFIG.COL_ASSET_TYPE) {
          var referenceCell = sheet.getRange(referenceRowWithDropdown, col);
          var validation = referenceCell.getDataValidation();
          if (validation) {
            targetCell.setDataValidation(validation);
            Logger.log('Applied dropdown validation to row ' + targetRowNum + ', col ' + col);
          } else {
            Logger.log('WARNING: No dropdown found in reference row for column ' + col);
          }
        } else {
          // For other columns, copy validation from source
          var validation = sourceCell.getDataValidation();
          if (validation) {
            targetCell.setDataValidation(validation);
          }
        }
        
        // Copy number format (including timestamp format)
        targetCell.setNumberFormat(sourceCell.getNumberFormat());
        
        // Copy font style
        targetCell.setFontFamily(sourceCell.getFontFamily());
        targetCell.setFontSize(sourceCell.getFontSize());
        targetCell.setFontWeight(sourceCell.getFontWeight());
        targetCell.setFontStyle(sourceCell.getFontStyle());
        targetCell.setFontColor(sourceCell.getFontColor());
        
        // Copy background color
        targetCell.setBackground(sourceCell.getBackground());
        
        // Copy horizontal alignment
        targetCell.setHorizontalAlignment(sourceCell.getHorizontalAlignment());
        
        // Copy vertical alignment
        targetCell.setVerticalAlignment(sourceCell.getVerticalAlignment());
      }
    }
    
    Logger.log('Successfully added ' + newRowCount + ' new timestamped rows (deduplicated)');
    Logger.log('Timestamp: ' + Utilities.formatDate(currentTimestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'));
    
    // Optional: Send confirmation email
    var duplicatesRemoved = validRows.length - newRowCount;
    var emailBody = '<html><body style="font-family: Arial, sans-serif;">' +
      '<h3 style="color: #16a34a;">Weekly Portfolio Timestamp Update</h3>' +
      '<div style="background: #f0fdf4; padding: 16px; border-left: 4px solid #16a34a; margin: 20px 0;">' +
      '<p style="margin: 0;"><strong>' + newRowCount + '</strong> unique asset' + (newRowCount > 1 ? 's' : '') + ' have been duplicated with fresh timestamps.</p>' +
      '</div>' +
      '<div style="background: #f9fafb; padding: 12px; border-radius: 4px; margin: 15px 0;">' +
      '<p style="margin: 5px 0;"><strong>📅 Timestamp:</strong> ' + Utilities.formatDate(currentTimestamp, Session.getScriptTimeZone(), 'EEEE, MMMM dd, yyyy HH:mm') + '</p>' +
      '<p style="margin: 5px 0;"><strong>Total rows added:</strong> ' + newRowCount + '</p>';
    
    if (duplicatesRemoved > 0) {
      emailBody += '<p style="margin: 5px 0;"><strong>🔄 Duplicates removed:</strong> ' + duplicatesRemoved + ' (kept most recent entries only)</p>';
    }
    
    emailBody += '</div>' +
      '<p><strong>Dropdown validation preserved</strong> - Column E formatting copied successfully</p>' +
      '<p>Please review and update the amounts in your <a href="' + ss.getUrl() + '" style="color: #3b82f6; text-decoration: none; font-weight: 600;">Investment Tracker</a> before the Sunday report.</p>' +
      '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">' +
      '<p style="color: #666; font-size: 11px; line-height: 1.5;">This is an automated update from your Investment Tracker.<br>Unique assets identified by Asset ID + Asset Name combination (Columns B + C).</p>' +
      '</body></html>';
    
    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: 'Portfolio Rows Auto-Updated (' + newRowCount + ' assets)',
      htmlBody: emailBody
    });
    
  } catch (error) {
    Logger.log('Error in addWeeklyTimestampRows: ' + error.toString());
    
    // Send error notification
    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: 'Portfolio Auto-Update Failed',
      body: 'Failed to add weekly timestamp rows.\n\nError: ' + error.toString()
    });
  }
}

/**
 * Manual test function - run this to test the timestamp addition
 */
function testWeeklyTimestampRows() {
  addWeeklyTimestampRows();
}

/**
 * Setup Helper - Run this FIRST to verify configuration
 * This will check if your SPREADSHEET_ID is configured correctly
 */
function verifySetup() {
  try {
    Logger.log('=== Investment Tracker Setup Verification ===');
    
    // Check SPREADSHEET_ID
    if (!CONFIG.SPREADSHEET_ID || CONFIG.SPREADSHEET_ID === '') {
      Logger.log('ERROR: SPREADSHEET_ID is not configured!');
      Logger.log('Please add your spreadsheet ID to CONFIG.SPREADSHEET_ID');
      Logger.log('🔗 Get it from your sheet URL: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit');
      return;
    }
    
    Logger.log('SPREADSHEET_ID configured: ' + CONFIG.SPREADSHEET_ID);
    
    // Try to open spreadsheet
    var ss = getSpreadsheet();
    Logger.log('Successfully opened spreadsheet: ' + ss.getName());
    Logger.log('🔗 URL: ' + ss.getUrl());
    
    // Check sheet exists
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      Logger.log('ERROR: Sheet "' + CONFIG.SHEET_NAME + '" not found!');
      Logger.log('Available sheets: ' + ss.getSheets().map(function(s) { return s.getName(); }).join(', '));
      return;
    }
    
    Logger.log('Found sheet: ' + CONFIG.SHEET_NAME);
    Logger.log('Last row: ' + sheet.getLastRow());
    
    // Check email
    Logger.log('Email configured: ' + CONFIG.EMAIL_TO);
    
    // Test email sending (optional)
    Logger.log('\n📧 Sending test email...');
    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: 'Investment Tracker Setup Verified',
      htmlBody: '<html><body>' +
        '<h2>Setup Verification Successful!</h2>' +
        '<p>Your Investment Tracker is configured correctly.</p>' +
        '<ul>' +
        '<li><strong>Spreadsheet:</strong> ' + ss.getName() + '</li>' +
        '<li><strong>Sheet:</strong> ' + CONFIG.SHEET_NAME + '</li>' +
        '<li><strong>Rows:</strong> ' + sheet.getLastRow() + '</li>' +
        '<li><strong>URL:</strong> <a href="' + ss.getUrl() + '">Open Spreadsheet</a></li>' +
        '</ul>' +
        '<p>You can now set up your triggers!</p>' +
        '</body></html>'
    });
    
    Logger.log('Test email sent successfully!');
    Logger.log('\n🎉 All checks passed! You can now:');
    Logger.log('   1. Set up time-based triggers');
    Logger.log('   2. Test the main functions');
    Logger.log('   3. Let automation run!');
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    Logger.log('Make sure you have authorized the script and configured SPREADSHEET_ID correctly.');
  }
}
