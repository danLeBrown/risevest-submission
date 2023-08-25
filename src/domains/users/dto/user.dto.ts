export class UserDto {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromEntity(entity: UserDto): UserDto {
    return new UserDto(entity.id, entity.name);
  }

  static collection(entities: UserDto[]): UserDto[] {
    return entities.map((entity) => UserDto.fromEntity(entity));
  }
}
