export interface IUseAction {
  watch: any
  onSuccess?: () => void;
  onFailed?: (err: any) => void;
}