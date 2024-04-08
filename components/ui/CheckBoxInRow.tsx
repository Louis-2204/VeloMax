import { Checkbox } from './checkbox';

export function CheckBoxInRow({ id, text }: { id: string; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm text-vm_text_gray dark:text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
}
