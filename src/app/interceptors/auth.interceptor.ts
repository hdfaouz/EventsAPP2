import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  console.log('🔍 Interceptor appelé pour:', req.url);

  // Récupérer le token depuis localStorage
  const token = localStorage.getItem('authToken');
  console.log('🔑 Token trouvé:', token ? 'OUI' : 'NON');

  // Cloner la requête et ajouter le header Authorization si le token existe
  let authRequest = req;
  if (token) {
    authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('✅ Header Authorization ajouté');
  } else {
    console.log('❌ Pas de token, pas de header ajouté');
  }

  // Gérer les erreurs d'authentification
  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('❌ Erreur interceptée:', error.status, error.message);

      if (error.status === 401) {
        console.log('🚪 Token expiré ou invalide, redirection vers login');
        // Token expiré ou invalide
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
