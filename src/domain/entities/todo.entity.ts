
interface TodoData {
    id: number,
    text: string,
    completedAt?: Date|null, 
}

export class TodoEntity {

    public id: number;
    public text: string;
    public completedAt?: Date|null;

    constructor( data: TodoData ){
        this.id = data.id;
        this.text = data.text;
        this.completedAt = data.completedAt;
    }

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromJSON( object: {[key: string]: any} ): TodoEntity{
        const { id, text, completedAt } = object;
        if( !id ) throw 'id is required';
        if( !text ) throw 'text is required';

        let newCompletedAt = completedAt;
        if( completedAt ) {
            newCompletedAt = new Date(completedAt);
            if( newCompletedAt.toString() === 'Invalid Date' ) throw ['CompletedAt must be a valid date'];
        }

        return new TodoEntity({
            id,
            text,
            completedAt
        })
    }
}