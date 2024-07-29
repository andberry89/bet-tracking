export const chartOptions = title => {
  const options = {
    elements: {
      line: {
        borderColor: '#15c63c',
        borderCapStyle: 'round',
      },
      point: {
        pointStyle: 'rectRot',
        hitRadius: 2,
        radius: 8,
        hoverRadius: 12,
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 0,
        grid: {
          display: false,
          color: 'rgba(150,150,150,.3)',
        },
      },
      x: {
        grid: {
          color: 'rgba(150,150,150,0.1)',
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        backgroundColor: 'rgba(225,225,225,0.75)',
        borderWidth: 2,
        borderColor: 'rgb(255,253,250)',
        displayColors: false,
        padding: 12,
        titleAlign: 'center',
        caretPadding: 4,
        callbacks: {
          label: context => {
            let label = context.dataset.label || ''

            if (context.parsed.y !== null && context.parsed.y >= 0) {
              label += '+'
            }

            label += context.parsed.y

            const suffix = context.parsed.y === 1 ? '' : 's'
            label += ' unit' + suffix

            return label
          },
          labelTextColor: () => {
            return 'rgb(255,253,250)'
          },
          afterBody: context => {
            const backgroundColor = context[0].parsed.y >= 0 ? 'rgba(21,198,60,0.8)' : 'rgba(204,0,0,0.8)'
            context[0].chart.tooltip.options.backgroundColor = backgroundColor
          },
        },
      },
    },
    maintainAspectRatio: false,
  }

  return options
}

export const chartData = (dates, runningTotal) => {
  const data = {
    labels: dates,
    datasets: [
      {
        backgroundColor: '#15c63c',
        data: runningTotal,
      },
    ],
  }
  return data
}
