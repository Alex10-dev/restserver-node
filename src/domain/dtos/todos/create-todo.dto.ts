
interface RequestData {
    [key: string]: any
}

export class CreateTodoDTO {

    private constructor(
        public readonly text: string,
    ){}

    static createFromRequestBody( data: RequestData ): [string?, CreateTodoDTO?]{

        const { text } = data;
        if( !text ) return ['Text property is required', undefined];

        return [undefined, new CreateTodoDTO(text)];
    }
}