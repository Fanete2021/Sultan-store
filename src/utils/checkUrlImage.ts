import { baseUrl } from '../constants'

export const checkUrlImage = (currentPath: string, image: string): string => {
    return baseUrl ? `${baseUrl}/images/${image}` : currentPath
}
