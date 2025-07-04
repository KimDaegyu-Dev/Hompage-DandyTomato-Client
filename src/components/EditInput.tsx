import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function EditInput({
    placeholder,
    value,
    onChange,
    className,
    onBlur
}: {
    placeholder: string
    value: string
    onChange: (value: string) => void
    className?: string
    onBlur?: () => void
}) {
    return (
        <Input
            className={cn(
                'text-16 text-sub-seoultech-blue bg-pri-gray-1 dark:bg-pri-gray-1 placeholder:text-sub-seoultech-blue rounded-15 h-full w-full px-16 py-16 font-medium',
                className
            )}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
        />
    )
}
