export type Selector = {
    LabelText: string;
    SelectItem: string[];
};

export const SelectOS: Selector = {
    LabelText: 'Select OS',
    SelectItem: ['Ubuntu'],
};
export const SelectLangs: Selector = {
    LabelText: 'Select Develop Language',
    SelectItem: ['Rust', 'TypeScript'],
};
export const SelectFrameWork: Selector = {
    LabelText: 'Select Use FrameWork',
    SelectItem: ['Next.js'],
};
export const SelectPackageManager: Selector = {
    LabelText: 'Use Package Manager',
    SelectItem: ['npm', 'yarn', 'bun'],
};