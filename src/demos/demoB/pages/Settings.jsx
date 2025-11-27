import React, { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'zh-CN'
  });

  return (
    <div className="demo-b-page">
      <h2>设置</h2>
      <div style={{ marginTop: '20px' }}>
        <h3>系统设置：</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              checked={settings.notifications}
              onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
            />
            启用通知
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              checked={settings.darkMode}
              onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
            />
            深色模式
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            语言：
            <select 
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              style={{ padding: '5px' }}
            >
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
