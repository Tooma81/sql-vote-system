import React from 'react';

const VoteTable = ({ data }) => {
  return (
    <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Eesnimi</th>
            <th style={cellStyle}>Perenimi</th>
            <th style={cellStyle}>Hääletuse aeg</th>
            <th style={cellStyle}>Otsus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={cellStyle}>{row.id}</td>
              <td style={cellStyle}>{row.eesnimi}</td>
              <td style={cellStyle}>{row.perenimi}</td>
              <td style={cellStyle}>{new Date(row.haalestuse_aeg).toLocaleString('et-EE')}</td>
              <td style={{ 
                ...cellStyle, 
                color: row.otsus === 'poolt' ? 'green' : row.otsus === 'vastu' ? 'red' : 'gray',
                fontWeight: 'bold'
              }}>
                {row.otsus || 'Ootab...'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = { padding: '12px', border: '1px solid #ddd' };

export default VoteTable;