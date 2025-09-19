import { Memory } from '@prisma/client'
import { axiosInstance } from './instance'
import { ApiRoutes } from './constants'

export const getAll = async (): Promise<Memory[]> => {
	return (await axiosInstance.get<Memory[]>(ApiRoutes.MEMORY)).data
}
