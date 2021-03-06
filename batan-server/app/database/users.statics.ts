import { IUserDocument, IUserModel } from "./users.types";

export async function findOneOrCreate(
    this: IUserModel,
    user: IUserDocument
): Promise<IUserDocument> {
    const record = await this.findOne({sub: user.sub});
    if(record) {
        return record;
    } else {
        return this.create(user);
    }
}

export async function findByEmail(
    this: IUserModel,
    email: string,
) : Promise<IUserDocument | null> {
    return this.findOne({email: email});
}

export async function findBySub(
    this: IUserModel,
    sub: string,
) : Promise<IUserDocument | null> {
    return this.findOne({sub: sub});
}

export async function deleteUser(
    this: IUserModel,
    sub: string,
) : Promise<IUserDocument | null> {
    return this.findOneAndDelete({sub: sub});
}