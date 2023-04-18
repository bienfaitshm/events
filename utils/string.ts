// by bienfaitshm
export function getInitialName(
    name: string,
    spliterString: string = " ",
    charLength: number = 2
): string {
    return name
        .split(spliterString)
        .map((value) => value.substring(0, 1))
        .join("")
        .substring(0, charLength);
}
