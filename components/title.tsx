import React, { CSSProperties } from "react";
import IntrinsicElements = React.JSX.IntrinsicElements;

export type Props = {
    H: keyof IntrinsicElements
    top?: string
    id: string
    className?: string
    style?: CSSProperties
    children: React.ReactNode
}

export function Title({ H, top = "-4em", id, className, style, children }: Props)
{
    return <H
        style={{position: "relative", ...(style ?? {})}}
        className={className}
    >
        <span id={id} style={{position: "absolute", top,}}></span>
        <a href={`#${id}`}>{children}</a>
    </H>
}

export const H1 = ({ children, ...props }: Omit<Props, 'H'>) => <Title {...props} H="h1">{children}</Title>
export const H2 = ({ children, ...props }: Omit<Props, 'H'>) => <Title {...props} H="h2">{children}</Title>
export const H3 = ({ children, ...props }: Omit<Props, 'H'>) => <Title {...props} H="h3">{children}</Title>
export const H4 = ({ children, ...props }: Omit<Props, 'H'>) => <Title {...props} H="h4">{children}</Title>
export const H5 = ({ children, ...props }: Omit<Props, 'H'>) => <Title {...props} H="h5">{children}</Title>
