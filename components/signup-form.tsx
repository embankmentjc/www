import { FormEvent, ReactNode, useState } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const messages: Record<string, string> = {
    'MF000': 'Successfully sent!',
    'MF001': 'Recipients are not set!',
    'MF002': 'Form will not work locally!',
    'MF003': 'Please, define email field in your form!',
    'MF004': 'Please, define type of your form!',
    'MF254': 'Something went wrong with PHPMailer!',
    'MF255': 'Aw, snap! Something went wrong.',
}

export function useFormSubmit(action: string = '/bat/cc-signup-with-email.php') {
    const [status, setStatus] = useState<FormStatus>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        setStatus('submitting')
        setMessage('')

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
            })

            const text = await response.text()
            // PHP returns plain text code like "MF000" or JSON like {"code": "MF000"}
            let code: string
            try {
                const json = JSON.parse(text)
                code = json.code || 'MF255'
            } catch {
                code = text.trim()
            }

            if (code === 'MF000') {
                setStatus('success')
                setMessage(messages[code])
                form.reset()
            } else {
                setStatus('error')
                setMessage(messages[code] || messages['MF255'])
            }
        } catch (err) {
            setStatus('error')
            setMessage(messages['MF255'])
        }
    }

    return { status, message, handleSubmit }
}

export function FormOutput({ status, message }: { status: FormStatus; message: string }) {
    if (status === 'idle') return null

    const statusClass = status === 'error' ? 'error' : status === 'success' ? 'success' : ''
    const text = status === 'submitting' ? 'Sending...' : message

    return (
        <div className="offset-top-10" style={{ position: 'relative' }}>
            <div className={`form-output active ${statusClass}`} style={{ position: 'relative', fontSize: '14px' }}>
                {text}
            </div>
        </div>
    )
}

// Simple inline subscribe form (email only)
export function SubscribeForm({ className = '' }: { className?: string }) {
    const { status, message, handleSubmit } = useFormSubmit()

    return (
        <form className={`rd-mailform ${className}`} onSubmit={handleSubmit}>
            <input type="hidden" name="form-type" value="subscribe" />
            <div className="form-group">
                <div className="input-group input-group-sm">
                    <span className="input-group-prepend">
                        <span className="input-group-text input-group-icon">
                            <span className="mdi mdi-email" />
                        </span>
                    </span>
                    <input
                        className="form-control"
                        placeholder="your@email.com"
                        type="email"
                        name="email"
                        required
                        disabled={status === 'submitting'}
                    />
                    <span className="input-group-append">
                        <button
                            className="btn btn-sm btn-primary"
                            type="submit"
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'Sending...' : 'Subscribe'}
                        </button>
                    </span>
                </div>
            </div>
            <FormOutput status={status} message={message} />
        </form>
    )
}

// Form field component
const placeholders: Record<string, string> = {
    firstname: 'John',
    lastname: 'Doe',
    phone: '(555) 123-4567',
    email: 'you@example.com',
    message: 'Tell us about yourself...',
    background: 'Tell us about yourself...',
}

function Field({ label, id, cols = 6, required = true }: {
    label: string
    id?: string
    cols?: number
    required?: boolean
}) {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, '')
    const isTextarea = fieldId === 'message' || fieldId === 'background'
    const placeholder = placeholders[fieldId] || ''

    return (
        <div className={`col-md-${cols}`} style={{ marginBottom: '1rem' }}>
            <div className="form-group">
                <label htmlFor={fieldId} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{label}{required && ' *'}</label>
                {isTextarea ? (
                    <textarea
                        className="form-control"
                        id={fieldId}
                        name={fieldId}
                        placeholder={placeholder}
                        required={required}
                    />
                ) : (
                    <input
                        className="form-control"
                        id={fieldId}
                        name={fieldId}
                        type={fieldId === 'email' ? 'email' : fieldId === 'phone' ? 'tel' : 'text'}
                        placeholder={placeholder}
                        required={required}
                    />
                )}
            </div>
        </div>
    )
}

// Full volunteer/contact form
export function VolunteerForm({ className = '' }: { className?: string }) {
    const { status, message, handleSubmit } = useFormSubmit()

    return (
        <form className={`rd-mailform text-left ${className}`} onSubmit={handleSubmit}>
            <input type="hidden" name="form-type" value="contact" />
            <div className="row justify-content-sm-center">
                <Field label="First name" id="firstname" />
                <Field label="Last name" id="lastname" />
                <Field label="Phone" required={false} />
                <Field label="Email" />
                <Field label="Background" id="message" cols={12} required={false} />
            </div>
            <FormOutput status={status} message={message} />
            <div className="offset-top-24 text-center">
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={status === 'submitting'}
                >
                    {status === 'submitting' ? 'Sending...' : 'Submit'}
                </button>
            </div>
        </form>
    )
}
