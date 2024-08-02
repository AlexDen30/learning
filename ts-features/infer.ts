const User = {
    id: 123,
    username: 'John',
    email: 'john@mail.com',
    addons: [
        { name: 'First addon', id: 1 },
        { name: 'Second addon', id: 2 }
    ]
}

type UnpackArray<T> = T extends (infer R)[] ? R : T

type AddonType = UnpackArray<typeof User.addons> // { name: string, id: number }