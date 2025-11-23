document.getElementById("root").innerHTML = `
  <div style="max-width: 1200px; margin: 0 auto;">
    <h1 style="color: #fbbf24; font-size: 3rem; margin-bottom: 1rem;">🌐 Market Grid</h1>
    <p style="color: #9ca3af; font-size: 1.2rem; margin-bottom: 2rem;">Solar-denominated asset marketplace</p>
    
    <div id="items-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
      <p style="color: #6b7280;">Loading market items...</p>
    </div>
  </div>
`;

// Fetch market items
fetch('/api/market-grid/items')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('items-container');
    if (data.items && data.items.length > 0) {
      container.innerHTML = data.items.map(item => `
        <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 8px; padding: 1.5rem;">
          <h3 style="margin-top: 0; color: #fbbf24;">${item.title}</h3>
          <p style="color: #9ca3af; font-size: 0.875rem;">${item.description}</p>
          <p style="margin-top: 1rem; color: #fbbf24; font-weight: bold;">
            ${item.rays_value} Rays
            <span style="color: #6b7280; font-weight: normal; font-size: 0.875rem;">
              (${item.solar_value || 'N/A'} Solar)
            </span>
          </p>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p style="color: #6b7280;">No items listed yet.</p>';
    }
  })
  .catch(e => console.error('Failed to load market items:', e));
