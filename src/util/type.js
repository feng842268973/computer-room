import Ground from '@/models/ground'
import Window from '@/models/window'
import Door from '@/models/door'
import Shelves from '@/models/shelves'
import Wall from '@/models/wall'
export const createAllTypeGeometry = async (opt) => {
    const type = opt.type
    let obj = null
    switch(type) {
        case 'ground':
            obj = new Ground(opt)
            break
        case 'window':
            obj = new Window(opt)
            break
        case 'door':
            obj = new Door(opt)
            break
        case 'shelves':
            obj = new Shelves(opt)
            break
        case 'wall':
            obj = new Wall(opt)
            break
    }
    const mesh = await obj.createMesh()
    return mesh
}