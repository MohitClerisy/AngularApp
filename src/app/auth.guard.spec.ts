// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
// import { AuthGuard, PermissionsService } from './auth.guard';

// describe('PermissionsService', () => {
//   let permissionsService: PermissionsService;
//   let router: jasmine.SpyObj<Router>;
  
//   beforeEach(() => {
//     router = jasmine.createSpyObj('Router', ['navigate']);
//     permissionsService = new PermissionsService(router);
//   });

//   it('should return true when user is logged in', () => {
//     spyOn(localStorage, 'getItem').and.returnValue('fakeToken');
//     const canActivateResult = permissionsService.canActivate(
//       {} as ActivatedRouteSnapshot,
//       {} as RouterStateSnapshot
//     );
//     expect(canActivateResult).toBeTrue();
//   });

//   it('should return false and navigate to login when user is not logged in', () => {
//     spyOn(localStorage, 'getItem').and.returnValue(null);
//     const canActivateResult = permissionsService.canActivate(
//       {} as ActivatedRouteSnapshot,
//       {} as RouterStateSnapshot
//     );
//     expect(canActivateResult).toBeFalse();
//     expect(router.navigate).toHaveBeenCalledWith(['/login']);
//   });

//   it('should return true when user is logged in via AuthGuard', () => {
//     spyOn(localStorage, 'getItem').and.returnValue('fakeToken');
//     const canActivateResult = AuthGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
//     expect(canActivateResult).toBeTrue();
//   });

//   it('should return false and navigate to login when user is not logged in via AuthGuard', () => {
//     spyOn(localStorage, 'getItem').and.returnValue(null);
//     const canActivateResult = AuthGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
//     expect(canActivateResult).toBeFalse();
//     expect(router.navigate).toHaveBeenCalledWith(['/login']);
//   });
// });