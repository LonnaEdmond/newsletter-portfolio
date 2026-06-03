const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public');

// Strict Logo Colors
const c_dark = "#2A2E33"; // Charcoal from "SUNBELT SPORTS"
const c_green = "#1EAE59"; // Vibrant green from "S" logo
const c_white = "#FFFFFF";
const c_light = "#F4F5F6"; // Derived structural gray
const c_border = "#DDE2E5"; // Derived boundary gray

const dataSets = [
  {
    filename: "01-daily-site-report.html",
    title: "Daily Site Report",
    subtitle: "Fast Morning Field Briefing",
    date: "Oct 24, 2026",
    kpis: [
      { label: "Active Crews", value: "14" },
      { label: "Tons Placed", value: "1,690" },
      { label: "QC Alerts", value: "1", highlight: true }
    ],
    body: "Favorable paving conditions across the Southeast region. Austin field teams hit scheduled compaction density benchmarks (98.2%). The Atlanta facility encountered a minor batch plant delay early this morning, shifting base layer operations for RHS Stadium to Wednesday.",
    tableHeaders: ["Site", "Crew", "Activity", "Tons", "Status"],
    tableRows: [
      ["TX A&M Track Phase 2", "Alpha", "Surface Paving", "450", "On Track"],
      ["Zilker Courts Complex", "Bravo", "Laser Grading", "0", "Ahead"],
      ["Atlanta Municipal", "Delta", "GAB Base Layer", "1,240", "QC Alert"]
    ]
  },
  {
    filename: "02-weekly-project-summary.html",
    title: "Weekly Project Summary",
    subtitle: "Managerial Readout",
    date: "Week of Oct 19, 2026",
    kpis: [
      { label: "Schedule Var", value: "+1.5 Days", highlight: true },
      { label: "Labor Burn", value: "42.1%" },
      { label: "Mat. Var", value: "1.2%" }
    ],
    body: "Project Atlanta Municipal has fully recovered from previous weather delays following weekend shift work. Track surfacing sub-base is graded within 0.05% tolerance. Awaiting final soils sign-off before commencing synthetic surface installation next Tuesday.",
    tableHeaders: ["Phase", "Start Date", "Est. End", "Progress", "Health"],
    tableRows: [
       ["Mobilization", "10-Oct", "14-Oct", "100%", "Complete"],
       ["Laser Grading", "15-Oct", "22-Oct", "100%", "Complete"],
       ["Paving Base", "23-Oct", "02-Nov", "45%", "Active"],
       ["Surfacing", "05-Nov", "18-Nov", "0%", "Pending"]
    ]
  },
  {
    filename: "03-weekly-business-review.html",
    title: "Weekly Business Review",
    subtitle: "Analytical Leadership Readout",
    date: "Oct 24, 2026",
    kpis: [
      { label: "WTD Revenue", value: "$1.45M" },
      { label: "Gross Margin", value: "24.1%", highlight: true },
      { label: "AR > 60d", value: "$310K" }
    ],
    body: "EBITDA trending positive against Q3 forecasts. Asphalt raw material costs saw a 1.2% stabilization this week, padding base margins for the upcoming Dallas contracts. Cash flows remain robust, though aging receivables in the public sector divisions require follow-up with Austin ISD.",
    tableHeaders: ["Region", "Rev WTD", "Margin", "Active Jobs", "Backlog"],
    tableRows: [
      ["Southeast", "$850,000", "25.2%", "12", "$4.2M"],
      ["Texas", "$410,000", "22.8%", "8", "$5.8M"],
      ["Midwest", "$190,000", "21.5%", "4", "$1.1M"]
    ]
  },
  {
    filename: "04-monthly-operations-overview.html",
    title: "Monthly Operations Overview",
    subtitle: "Executive Recap",
    date: "October 2026",
    kpis: [
      { label: "Total Projects", value: "24" },
      { label: "Safety Incidents", value: "0", highlight: true },
      { label: "Fleet Util", value: "88.5%" }
    ],
    body: "October marked our highest production month of the fiscal year. Fleet utilization remained exceptionally high at 88.5%, with minimal unplanned downtime across our paving train inventory. We successfully delivered 12 municipal field surfaces ahead of schedule, reinforcing our strategic municipal expansion targets for Q4.",
    tableHeaders: ["Category", "Oct Actual", "Target", "Variance", "Trend"],
    tableRows: [
      ["Asphalt Placed (Tons)", "18,450", "16,000", "+2,450", "Up"],
      ["Synthetic (SqFt)", "420K", "450K", "-30K", "Down"],
      ["Man Hours Logged", "14,200", "15,000", "-800", "Under"],
      ["Equip Downtime", "4.2%", "5.0%", "-0.8%", "Improving"]
    ]
  }
];

const htmlWrapper = (content, title) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width">
    <title>${title}</title>
    <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
    <style>
      body { margin: 0; padding: 0; width: 100% !important; background-color: ${c_light}; }
      table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      @media screen and (max-width: 640px) {
        .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; }
        .stack { display: block !important; width: 100% !important; }
        .stack-pad { padding: 10px 0 !important; }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${c_light}; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
  <center style="width: 100%; background-color: ${c_light}; padding: 40px 0;">
    <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center"><tr><td><![endif]-->
    <div style="max-width: 640px; margin: 0 auto;">
      ${content}
    </div>
    <!--[if mso]></td></tr></table><![endif]-->
  </center>
</body>
</html>`;

const variations = [
  {
    folder: 'variation-1-blueprint-grid',
    name: 'Blueprint Grid',
    notes: `<!-- DESIGN NOTES
CONCEPT: The Blueprint Grid (Structural, Technical, Architecture-focused)
MOVES:
1. Hard-lined grid system using rigid nested tables with thick #2A2E33 borders framing all content.
2. Heavy reliance on monospace typography for datelines and metrics to mirror technical schematics.
3. Utilitarian label blocks that look like stamped architectural drawings.
-->`,
    render: (data) => `
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: ${c_white}; border: 3px solid ${c_dark}; font-family: Arial, sans-serif;">
  <!-- MASTHEAD -->
  <tr>
    <td style="border-bottom: 3px solid ${c_dark}; background-color: ${c_white};">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 20px 24px; border-right: 1px solid ${c_dark}; width: 60%;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: ${c_dark}; text-transform: uppercase; letter-spacing: -0.5px;">SUNBELT SPORTS</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: ${c_dark}; font-family: 'Courier New', Courier, monospace; font-weight: bold;">[ ${data.title.toUpperCase()} ]</p>
          </td>
          <td style="padding: 20px 24px; background-color: ${c_light};" align="right" valign="bottom">
            <p style="margin: 0; font-size: 11px; color: ${c_dark}; font-family: 'Courier New', Courier, monospace; font-weight: bold; text-transform: uppercase;">DATE ISSUED</p>
            <p style="margin: 2px 0 0 0; font-size: 14px; color: ${c_dark}; font-family: 'Courier New', Courier, monospace;">${data.date}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <!-- KPIS -->
  <tr>
    <td style="border-bottom: 3px solid ${c_dark};">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          ${data.kpis.map((kpi, i) => `
            <td class="stack" ${i < data.kpis.length - 1 ? `style="border-right: 1px solid ${c_dark};"` : ''} width="${100/data.kpis.length}%" valign="top">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr><td style="padding: 8px 16px; background-color: ${c_dark}; border-bottom: 1px solid ${c_dark};">
                  <p style="margin: 0; font-size: 10px; color: ${c_white}; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">// ${kpi.label}</p>
                </td></tr>
                <tr><td style="padding: 16px; background-color: ${kpi.highlight ? c_green : c_white};">
                  <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 28px; font-weight: bold; color: ${kpi.highlight ? c_white : c_dark};">${kpi.value}</p>
                </td></tr>
              </table>
            </td>
          `).join('')}
        </tr>
      </table>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding: 30px 24px; border-bottom: 3px solid ${c_dark};">
      <h2 style="margin: 0 0 16px 0; font-size: 14px; color: ${c_dark}; text-transform: uppercase; letter-spacing: 1px;">Field Notes</h2>
      <p style="margin: 0; font-size: 15px; line-height: 1.6; color: ${c_dark};">${data.body}</p>
    </td>
  </tr>

  <!-- TABLE -->
  <tr>
    <td style="padding: 0;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family: 'Courier New', Courier, monospace;">
        <tr>
          ${data.tableHeaders.map((header) => `
            <th align="left" style="padding: 12px 16px; background-color: ${c_light}; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; color: ${c_dark}; border-bottom: 1px solid ${c_dark}; border-right: 1px solid ${c_border};">${header}</th>
          `).join('')}
        </tr>
        ${data.tableRows.map((row, i) => `
          <tr>
            ${row.map((cell) => `
              <td style="padding: 12px 16px; font-size: 13px; color: ${c_dark}; border-bottom: 1px solid ${c_border}; border-right: 1px solid ${c_border};">${cell}</td>
            `).join('')}
          </tr>
        `).join('')}
      </table>
    </td>
  </tr>
</table>
`
  },
  {
    folder: 'variation-2-high-vis-dispatch',
    name: 'High-Vis Dispatch',
    notes: `<!-- DESIGN NOTES
CONCEPT: High-Vis Dispatch (Action-Oriented, High Contrast)
MOVES:
1. Massive contrast utilizing the brand charcoal (#2A2E33) as primary blocks against white, separated by vibrant green (#1EAE59) safety-ribbon borders.
2. Bold, punchy sans-serif typography focused purely on readability and hierarchy.
3. Clean, horizontal-only dividers inside data blocks to prevent visual clutter while maintaining row tracking.
-->`,
    render: (data) => `
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: ${c_white}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  <!-- MASTHEAD -->
  <tr>
    <td style="padding: 30px; background-color: ${c_dark}; border-bottom: 6px solid ${c_green};">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td class="stack">
            <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: ${c_white}; letter-spacing: -0.5px;">SUNBELT SPORTS</h1>
            <p style="margin: 4px 0 0 0; font-size: 18px; color: ${c_green}; font-weight: bold;">${data.title}</p>
          </td>
          <td class="stack stack-pad" align="right" valign="top">
            <div style="display: inline-block; background-color: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 4px;">
              <p style="margin: 0; font-size: 12px; color: ${c_white}; font-weight: bold; text-transform: uppercase;">${data.date}</p>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <!-- KPIS -->
  <tr>
    <td style="padding: 30px;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          ${data.kpis.map((kpi, i) => `
            <td class="stack stack-pad" width="${100/data.kpis.length}%" valign="top">
              <div style="border-left: 4px solid ${kpi.highlight ? c_green : c_border}; padding-left: 16px;">
                <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: bold; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">${kpi.label}</p>
                <p style="margin: 0; font-size: 32px; font-weight: 800; color: ${c_dark}; letter-spacing: -1px;">${kpi.value}</p>
              </div>
            </td>
          `).join('')}
        </tr>
      </table>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding: 0 30px 30px 30px;">
      <div style="background-color: ${c_light}; padding: 24px; border-radius: 4px;">
        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: ${c_dark};">${data.body}</p>
      </div>
    </td>
  </tr>

  <!-- TABLE -->
  <tr>
    <td style="padding: 0 30px 40px 30px;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          ${data.tableHeaders.map((header) => `
            <th align="left" style="padding: 12px 8px; border-bottom: 2px solid ${c_dark}; font-size: 12px; text-transform: uppercase; font-weight: bold; color: ${c_dark};">${header}</th>
          `).join('')}
        </tr>
        ${data.tableRows.map((row, i) => `
          <tr>
            ${row.map((cell, j) => `
              <td style="padding: 14px 8px; font-size: 14px; color: ${c_dark}; border-bottom: 1px solid ${c_border}; font-weight: ${j === 0 ? 'bold' : 'normal'};">${cell}</td>
            `).join('')}
          </tr>
        `).join('')}
      </table>
    </td>
  </tr>
</table>
`
  },
  {
    folder: 'variation-3-executive-dossier',
    name: 'Executive Dossier',
    notes: `<!-- DESIGN NOTES
CONCEPT: Executive Dossier (Clean, Corporate, Minimalist)
MOVES:
1. Editorial elegance substituting heavy blocks for generous whitespace and structural restraint.
2. Georgia (serif) utilized for primary headers to evoke leadership reports and formal business journals.
3. Tables and KPI blocks drop all vertical boundaries, relying strictly on alignment and sparse 1px horizontal rules.
-->`,
    render: (data) => `
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: ${c_white}; font-family: Arial, sans-serif; border: 1px solid ${c_border};">
  <!-- MASTHEAD -->
  <tr>
    <td style="padding: 40px 40px 20px 40px; text-align: center;">
      <p style="margin: 0 0 16px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: ${c_green}; font-weight: bold;">SUNBELT SPORTS</p>
      <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: normal; font-family: Georgia, serif; color: ${c_dark};">${data.title}</h1>
      <p style="margin: 0; font-size: 13px; color: #666; font-style: italic; font-family: Georgia, serif;">${data.date}</p>
    </td>
  </tr>
  
  <!-- DIVIDER -->
  <tr>
    <td style="padding: 0 40px;"><div style="border-top: 1px solid ${c_border};"></div></td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding: 30px 40px;">
      <p style="margin: 0; font-size: 16px; line-height: 1.8; color: ${c_dark}; font-family: Georgia, serif;">${data.body}</p>
    </td>
  </tr>

  <!-- KPIS -->
  <tr>
    <td style="padding: 0 40px 30px 40px;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          ${data.kpis.map((kpi, i) => `
            <td class="stack stack-pad" width="${100/data.kpis.length}%" align="center" style="padding: 20px 0; border-top: 1px solid ${c_border}; border-bottom: 1px solid ${c_border};">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">${kpi.label}</p>
              <p style="margin: 0; font-family: Georgia, serif; font-size: 28px; color: ${kpi.highlight ? c_green : c_dark};">${kpi.value}</p>
            </td>
          `).join('')}
        </tr>
      </table>
    </td>
  </tr>

  <!-- TABLE -->
  <tr>
    <td style="padding: 10px 40px 40px 40px;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          ${data.tableHeaders.map((header) => `
            <th align="left" style="padding: 12px 4px; border-bottom: 2px solid ${c_dark}; font-size: 11px; text-transform: uppercase; font-weight: bold; color: ${c_dark}; letter-spacing: 0.5px;">${header}</th>
          `).join('')}
        </tr>
        ${data.tableRows.map((row, i) => `
          <tr>
            ${row.map((cell) => `
              <td style="padding: 14px 4px; font-size: 13px; color: ${c_dark}; border-bottom: 1px solid ${c_border};">${cell}</td>
            `).join('')}
          </tr>
        `).join('')}
      </table>
    </td>
  </tr>
</table>
`
  }
];

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

variations.forEach((v) => {
  const variationDir = path.join(outputDir, v.folder);
  if (!fs.existsSync(variationDir)) fs.mkdirSync(variationDir);

  dataSets.forEach((dataSet) => {
    // Inject design notes only into the daily site report
    const preamble = dataSet.filename === '01-daily-site-report.html' ? v.notes + '\\n' : '';
    const html = preamble + htmlWrapper(v.render(dataSet), dataSet.title);
    fs.writeFileSync(path.join(variationDir, dataSet.filename), html);
  });
});

// Write README
const readme = `# Sunbelt Sports Newsletter System

This folder contains the complete 12-template suite across 3 distinct design variations.
Every template utilizes inline CSS, table-based layouts, and safe brand colors extracted directly from the Sunbelt Sports logo.

## System Architecture

Across all variations, the visual system tightly adheres to the logo aesthetics:
- **Brand Charcoal (\`#2A2E33\`):** Primary structural borders, main text, heavy headers. 
- **Brand Green (\`#1EAE59\`):** Distinctive, vibrant accent color identical to the "S" logo, used sparingly for emphasis, positive deltas, and structural separation.
- **Backgrounds:** Clean white (\`#FFFFFF\`) with soft, derived gray canvases (\`#F4F5F6\`).

All templates are generated using rigid HTML table scaffolding to guarantee safe rendering across Outlook, Gmail, and mobile environments.

## The Variations

**1. Blueprint Grid (\`variation-1-blueprint-grid\`)**
Approaches data display like an architectural blueprint. Relies on heavy \`#2A2E33\` borders framing internal sections rigidly. Employs monospace typography (Courier/Courier New fallback) structurally to give numbers and metrics a literal, "stamped" operational feel.

**2. High-Vis Dispatch (\`variation-2-high-vis-dispatch\`)**
A highly punchy, action-oriented dispatch that anchors the masthead with solid charcoal and vibrant green trim. Typography is entirely set in robust sans-serifs (Helvetica/Arial), and table layouts remove internal vertical columns to keep the read-flow highly actionable and free of visual clutter.

**3. Executive Dossier (\`variation-3-executive-dossier\`)**
Substitutes heavy background fills in favor of generous whitespace, editorial alignments, and subtle \`1px\` horizontal rule dividers. The masthead and numeric data utilize elegant serif fallbacks (Georgia) to present leadership-level financial and operational overviews with dignity and precision.
`;
fs.writeFileSync(path.join(outputDir, 'README.md'), readme);

console.log('Successfully generated new brand-aligned templates.');
