type ServiceResponseSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

type ServiceResponseFailure = {
  message: string;
  success: false;
};

type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseFailure;
