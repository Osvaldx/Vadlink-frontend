import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url);

  const newRequest = req.clone({
    withCredentials: true
  })

  return next(newRequest);
};
