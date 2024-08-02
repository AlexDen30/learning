function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') throw Error('Переданное значение не является строкой!')
}