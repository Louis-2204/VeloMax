import { Checkbox } from './checkbox';

export function CheckBoxInRow({ id, text, defaultChecked }: { id: string; text: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox name={id} defaultChecked={defaultChecked} id={id} />
      <label
        htmlFor={id}
        className="text-sm text-vm_text_gray dark:text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-500"
      >
        {text}
      </label>
    </div>
  );
}
