/* 
типы выражения не должны расширяться (например, тип привет не может конвертироваться в string);
свойства объектных литералов становятся доступными только для чтения (readonly);
литералы массивов становятся доступными только для чтения кортежами (tuples).
**/

const roles = ['read', 'write', 'readAndWrite'] as const

type Roles = typeof roles[number]
// Эквивалентно
// type Roles = "read" | "write" | "readAndWrite"

type RolesInCapital = Capitalize<typeof roles[number]>
// Эквивалентно
// type RolesInCapital = "Read" | "Write" | "ReadAndWrite"