export function keyExtractor<D extends { id?: string | number }>(
    item: D,
    index: number
) {
    return item.id?.toString() || index.toString();
}
