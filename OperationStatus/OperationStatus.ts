export class OperationStatus<PayloadType> {
  constructor(
    readonly message: string,
    readonly payload: PayloadType
  ) {}
}
