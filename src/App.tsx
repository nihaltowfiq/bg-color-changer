import { useState } from 'react';

function App() {
  const [color, setColor] = useState('#ffffff');

  async function clickHandler() {
    const [tab] = await chrome.tabs.query({ active: true });

    if (!tab) return;

    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  }

  return (
    <div>
      <h3>BG COLOR CHANGER</h3>
      <div className="inner">
        <input
          defaultValue={color}
          value={color}
          type="color"
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={() => clickHandler()}>Change</button>
      </div>
    </div>
  );
}

export default App;
