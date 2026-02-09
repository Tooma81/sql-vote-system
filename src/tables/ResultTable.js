import React from 'react';

const ResultTable = ({ data }) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  };

  return (
    <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={cellStyle}>Hääletuse algus</th>
            <th style={cellStyle}>Hääletanute Arv</th>
            <th style={cellStyle}>Poolt Häälte Arv</th>
            <th style={cellStyle}>Vastu Häälte Arv</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={cellStyle}>{new Intl.DateTimeFormat('et-EE', options).format(new Date(row.h_alguse_aeg))}</td>
              <td style={cellStyle}>{row.haaletanute_arv}</td>
              <td style={cellStyle}>{row.poolt_haalte_arv}</td>
              <td style={cellStyle}>{row.vastu_haalte_arv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = { padding: '12px', border: '1px solid #ddd' };

export default ResultTable;