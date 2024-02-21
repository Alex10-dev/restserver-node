interface RequestData {
    [key: string]: any
}

interface updateData {
    id: number,
    text: string,
    completedAt?: Date,
}

export class UpdateTodoDTO {

    public readonly id: number;
    public readonly text: string;
    public readonly completedAt?: Date;

    private constructor( data: updateData ){
        this.id = data.id;
        this.text = data.text;
        this.completedAt = data.completedAt;
    }

    static createFromRequestBody( data: RequestData ): [string?, UpdateTodoDTO?]{
        const { id, text, completedAt } = data;

        if( !id || isNaN( Number(id) ) ) return['ID is required and it must be a valid number'];
        if( !text ) return ['Text property is required'];
        
        let newCompletedAt = completedAt;
        if( completedAt ) {
            newCompletedAt = new Date(completedAt);
            if( newCompletedAt.toString() === 'Invalid Date' ) return ['CompletedAt must be a valid date w/ format YYYY-MM-DD'];
        }

        return [undefined, new UpdateTodoDTO({ completedAt: newCompletedAt, text: text, id: id })];
    }
}