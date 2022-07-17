export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false
        }
    }
}

export const colors = [
    {
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        borderColor: 'rgb(13, 200, 60)',
        backgroundColor: 'rgba(13, 200, 60, 0.5)',
    },
    {
        borderColor: 'rgb(207, 187, 10)',
        backgroundColor: 'rgba(207, 187, 10, 0.5)',
    },
    {
        borderColor: 'rgb(167, 50, 167)',
        backgroundColor: 'rgba(167, 50, 167, 0.5)',
    }
]