export const STATUS = (message: string | null) =>{
    const code: any = {
        success: 200,
        notFound: 404,
        notConnectDb: 400
    }
    return  message ? code[message] : code['notConnectDb']
}

export const MESSAGES = (message: string | null) =>{
    const code: any = {
        notConnectDb: 'could not connect to db'
    }
    return  message ? code[message] : code['notConnectDb']
}


export const responseService = (code: number, data: any = null, errors?: string) => {
    return { 
        code,
        errors: errors ?? null,
        ...(data && {
            data: data ?? {}
        })
    }
}