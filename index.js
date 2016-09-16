const width = 100
const height = 75

const rand = () => Math.random() >= 0.85

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.classList.add(rand() ? 'active' : 'inactive')
        cell.style.width = window.innerWidth / width
        cell.style.height = window.innerHeight / height
        document.body.appendChild(cell)
    }
}

let children = document.body.querySelectorAll('div')
const pos = (x, y) => x < 0 || y < 0 ? -1 : x + y * width
const get = (x, y) => children[pos(x, y)]
const set = (x, y) => {
    get(x, y).classList.remove('inactive')
    get(x, y).classList.add('active')
} 
const val = cell => cell.classList.contains('active')

function update() {
    let new_states = []
    
    children = document.body.querySelectorAll('div')
    
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let i = pos(x,y)
            let cell = children[i]

            let neighbors = [
                // n
                get(x, y - 1) || get(x, height - 1),
                // s
                get(x, y + 1) || get(x, 0),
                // e
                get(x + 1, y) || get(0, y),
                // w
                get(x - 1, y) || get(width - 1, y),
                // ne
                get(x + 1, y - 1) || get(x + 1, height - 1)
                || get(0, y - 1) || get(0, height - 1),
                // nw
                get(x - 1, y - 1) || get(x - 1, height - 1)
                || get(width - 1, y - 1) || get(width - 1, height - 1),
                // se
                get(x + 1, y + 1) || get(x + 1, 0)
                || get(0, y + 1) || get(0, 0),
                // sw
                get(x - 1, y + 1) || get(x - 1, 0)
                || get(width - 1, y + 1) || get(width - 1, 0)
            ]

            let number_of_neighbors =
                neighbors
                    .map(x => x.classList.contains('active'))
                    .map(x => x ? 1 : 0)
                    .reduce((t, c) => t + c, 0)

            let active = val(cell)

            if (active) {
                //debugger
                if (number_of_neighbors < 2
                    || number_of_neighbors > 3) {
                    active = false
                }
            }
            else if(number_of_neighbors === 3) {
                //debugger
                active = true
            }

            new_states.push(active ? 'active' : 'inactive')
        }
    }
    
    let i = 0
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = get(x, y)
            cell.classList.remove('active')
            cell.classList.remove('inactive')
            let new_class = new_states[i]
            cell.classList.add(new_class)
            i++
        }
    }
}

setInterval(update, 200)