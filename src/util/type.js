import Ground from '@/models/ground'
import Window from '@/models/window'
import Door from '@/models/door'
export const createAllTypeGeometry = (opt) => {
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
    }
    const mesh = obj.createMesh()
    return mesh
}