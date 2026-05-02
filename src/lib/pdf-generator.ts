/**
 * PDF Generator for Homestead Plans
 * Generates HTML content that can be printed/saved as PDF
 */

export interface HomesteadPlanData {
  acreage: number
  familySize: number
  zone: string
  state: string
  wantsChickens: boolean
  coopRecommendation: string
  soilMix: SoilMixRecipe
  vegetableYields: VegetableYield[]
  recommendedCrops: string[]
}

export interface SoilMixRecipe {
  ratio: string
  ingredients: {
    name: string
    ratio: number
  }[]
  description: string
}

export interface VegetableYield {
  name: string
  yield: string
  notes: string
}

/**
 * Generates HTML content for a homestead plan document
 * Can be rendered in browser, downloaded, or sent to a PDF service
 */
export function generateHomesteadPlanHTML(data: HomesteadPlanData): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const brandColors = {
    primary: '#264228', // Forest green
    accent: '#A88032',  // Warm gold
    bg: '#F7F3EB'       // Parchment
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Homestead Plan - SteadCraft</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Old Standard TT', 'Georgia', serif;
      color: ${brandColors.primary};
      background-color: white;
      line-height: 1.6;
      padding: 40px;
    }

    .page {
      max-width: 850px;
      margin: 0 auto;
      background: white;
    }

    /* Header */
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid ${brandColors.accent};
    }

    .header-logo {
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 2px;
      color: ${brandColors.primary};
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .header h1 {
      font-size: 48px;
      color: ${brandColors.primary};
      margin-bottom: 5px;
      font-weight: normal;
      letter-spacing: 1px;
    }

    .header p {
      color: ${brandColors.accent};
      font-style: italic;
      font-size: 16px;
    }

    .header .date {
      color: #888;
      font-size: 12px;
      margin-top: 10px;
    }

    /* Section Headers */
    h2 {
      font-size: 28px;
      color: ${brandColors.primary};
      margin-top: 40px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid ${brandColors.accent};
      font-weight: normal;
    }

    h3 {
      font-size: 18px;
      color: ${brandColors.primary};
      margin-top: 20px;
      margin-bottom: 10px;
      font-weight: bold;
    }

    /* Summary Box */
    .summary-box {
      background-color: ${brandColors.bg};
      border-left: 4px solid ${brandColors.accent};
      padding: 20px;
      margin: 20px 0;
      border-radius: 2px;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .summary-item {
      break-inside: avoid;
    }

    .summary-label {
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      color: ${brandColors.accent};
      letter-spacing: 1px;
      margin-bottom: 5px;
    }

    .summary-value {
      font-size: 24px;
      color: ${brandColors.primary};
      font-weight: bold;
    }

    /* Content Sections */
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }

    .recommendation-box {
      background-color: ${brandColors.bg};
      padding: 15px 20px;
      border-radius: 4px;
      margin: 15px 0;
      border-left: 3px solid ${brandColors.accent};
    }

    .recommendation-box p {
      margin: 5px 0;
      line-height: 1.8;
    }

    /* Soil Mix Recipe */
    .soil-mix-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }

    .soil-mix-table th {
      background-color: ${brandColors.accent};
      color: white;
      padding: 10px;
      text-align: left;
      font-weight: bold;
    }

    .soil-mix-table td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .soil-mix-table tr:nth-child(even) {
      background-color: ${brandColors.bg};
    }

    /* Vegetable Yields Table */
    .yields-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }

    .yields-table th {
      background-color: ${brandColors.primary};
      color: white;
      padding: 10px;
      text-align: left;
      font-weight: bold;
    }

    .yields-table td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .yields-table tr:nth-child(even) {
      background-color: ${brandColors.bg};
    }

    /* Crop List */
    .crop-list {
      list-style: none;
      margin: 15px 0;
    }

    .crop-list li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
    }

    .crop-list li:before {
      content: "🌾";
      position: absolute;
      left: 0;
    }

    /* Footer */
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #666;
      font-size: 12px;
    }

    .footer p {
      margin: 5px 0;
    }

    /* Print Styles */
    @media print {
      body {
        padding: 0;
      }

      h2 {
        page-break-after: avoid;
      }

      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="header-logo">🌱 SteadCraft</div>
      <h1>Your Homestead Plan</h1>
      <p>The Homestead is Our Craft</p>
      <div class="date">Generated on ${date}</div>
    </div>

    <!-- Summary Section -->
    <div class="summary-box">
      <h2 style="margin-top: 0; border: none; padding: 0;">Your Homestead Profile</h2>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-label">Acreage</div>
          <div class="summary-value">${data.acreage} acres</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Family Size</div>
          <div class="summary-value">${data.familySize} people</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Growing Zone</div>
          <div class="summary-value">${data.zone}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Region</div>
          <div class="summary-value">${data.state}</div>
        </div>
      </div>
    </div>

    <!-- Recommended Crops Section -->
    <div class="section">
      <h2>🌱 Recommended Crops for Your Zone</h2>
      <p>These crops thrive in hardiness zone ${data.zone} and are ideal for your climate:</p>
      <ul class="crop-list">
        ${data.recommendedCrops.map(crop => `<li>${crop}</li>`).join('')}
      </ul>
    </div>

    <!-- Vegetable Yields Section -->
    <div class="section">
      <h2>📊 Realistic Vegetable Yield Targets</h2>
      <p>For a family of ${data.familySize} with ${data.acreage} acres, you can realistically expect:</p>
      <table class="yields-table">
        <thead>
          <tr>
            <th>Vegetable</th>
            <th>Expected Yield</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${data.vegetableYields.map(yieldItem => `
            <tr>
              <td><strong>${yieldItem.name}</strong></td>
              <td>${yieldItem.yield}</td>
              <td>${yieldItem.notes}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Soil Mix Section -->
    <div class="section">
      <h2>🥗 Elite DIY Soil Mix Recipe</h2>
      <p>${data.soilMix.description}</p>
      <h3>Ingredients (Scalable Ratios)</h3>
      <table class="soil-mix-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody>
          ${data.soilMix.ingredients.map(ing => `
            <tr>
              <td><strong>${ing.name}</strong></td>
              <td>${ing.ratio}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="recommendation-box">
        <p><strong>💡 Pro Tip:</strong> These ratios scale linearly. If you're mixing 8 raised beds, multiply all ratios by 8 and order bulk.</p>
      </div>
    </div>

    <!-- Chicken Section (if applicable) -->
    ${data.wantsChickens ? `
      <div class="section">
        <h2>🐓 Chicken Coop & Flock Recommendation</h2>
        <div class="recommendation-box">
          <p>${data.coopRecommendation}</p>
        </div>
        <p style="margin-top: 15px;">Check out our <strong>Chicken Coop Builder Guide</strong> for step-by-step instructions, and explore our curated selection of coop kits and supplies in the tools section.</p>
      </div>
    ` : ''}

    <!-- Next Steps -->
    <div class="section">
      <h2>📋 Next Steps</h2>
      <ol style="margin-left: 20px;">
        <li style="margin-bottom: 10px;"><strong>Prepare your soil:</strong> Order the components for your soil mix and prepare your beds before planting season.</li>
        <li style="margin-bottom: 10px;"><strong>Plan your garden layout:</strong> Map out where each crop will go based on sunlight and water needs.</li>
        <li style="margin-bottom: 10px;"><strong>Start a garden journal:</strong> Track planting dates, yields, and lessons learned each season.</li>
        ${data.wantsChickens ? '<li style="margin-bottom: 10px;"><strong>Plan your coop:</strong> Finalize dimensions and construction timeline before building.</li>' : ''}
        <li><strong>Join the SteadCraft community:</strong> Share your progress and learn from other homesteaders.</li>
      </ol>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>SteadCraft</strong> — AI-powered homesteading guides</p>
      <p>www.thesteadcraft.com</p>
      <p style="margin-top: 10px; font-style: italic;">Remember: Every homestead is unique. Use this plan as a guide, not gospel. Adjust based on your local conditions, experience, and goals.</p>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Triggers browser download of the HTML as a PDF
 * Uses browser's print-to-PDF functionality
 */
export function downloadPDFAsPrint(html: string, filename: string) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument || iframe.contentWindow?.document
  if (!doc) return

  doc.open()
  doc.write(html)
  doc.close()

  setTimeout(() => {
    iframe.contentWindow?.print()
    // Don't remove iframe immediately - let print dialog complete first
    setTimeout(() => document.body.removeChild(iframe), 100)
  }, 250)
}

/**
 * Alternative: Returns blob for programmatic handling
 * Useful if you want to upload to storage or send via API
 */
export async function generatePDFBlob(html: string): Promise<Blob> {
  // For now, return the HTML as a blob
  // In production, you might use a service like html2pdf.js or a backend PDF service
  return new Blob([html], { type: 'text/html' })
}
