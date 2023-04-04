export interface ICategory {
    category: string
    subcategories: string[]
}

export const categories: ICategory[] = [
    {
        category: 'Уход за телом',
        subcategories: [
            'Эпиляция и депиляция',
            'Средства для ванны и душа',
            'Скрабы, пиллинги и пр.',
            'Мочалки и губки для тела',
            'Кремы, лосьоны, масла',
            'Интимный уход',
            'Дезодоранты, антиперспиранты',
            'Гели для душа',
        ],
    },
    { category: 'Уход за руками', subcategories: [] },
    { category: 'Уход за ногами', subcategories: [] },
    { category: 'Уход за лицом', subcategories: [] },
    { category: 'Уход за волосами', subcategories: [] },
    { category: 'Средства для загара', subcategories: [] },
    { category: 'Средства для бритья', subcategories: [] },
    { category: 'Подарочные наборы', subcategories: [] },
    { category: 'Гигиеническая продукция', subcategories: [] },
    { category: 'Гигиена полости рта', subcategories: [] },
    { category: 'Бумажная продукция', subcategories: [] },
]
