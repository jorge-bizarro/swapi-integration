export interface IUseCase<T, R> {
  execute(request: T): R | Promise<R>;
}
