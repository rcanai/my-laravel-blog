<?php

namespace App\Http\Middleware;

use Closure;

use Auth;
use App;

class LanguageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $language = Auth::user() ? Auth::user()->language ?? 'ja' : 'ja';
        App::setLocale($language);
        return $next($request);
    }
}
