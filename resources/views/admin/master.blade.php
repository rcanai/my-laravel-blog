<!DOCTYPE html>
<html lang="{{$language}}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrf-token" content="{{csrf_token()}}">
  <title>@yield('title') My Laravel blog</title>
  <link rel="icon" href="{{asset('favicon.ico')}}">
  <link href="@assetTimestamp(css/app.css)" rel="stylesheet">
  @yield('styles')
</head>
<body>
  <input type="hidden" id="app-url" value="{{url('/')}}" style="display:none;">
  <input type="hidden" id="api-url" value="{{url('/_api')}}" style="display:none;">

  <header id="header">
    <div class="header-container">
      <div class="application-title">
        <a href="{{url('/')}}">
          My Laravel base
        </a>
      </div>
      <nav class="header-nav">
        <ul>
          <li>
            <a href="{{url('/')}}">@lang('route.home')</a>
          </li>
          <li>
            <a href="{{url('accounts')}}">@lang('route.blogs')</a>
          </li>
          <li>
            <a href="{{url('accounts')}}">@lang('route.accounts')</a>
          </li>
          <li>
            <a href="{{url('style-example')}}">@lang('route.style_example')</a>
          </li>
          <li class="dummy"></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">

    <div id="app" class="main-container" v-cloak>
      @yield('content')
    </div>

  </main>

  @include('_partials.move_page_top')

  <script src="@assetTimestamp(js/manifest.js)"></script>
  <script src="@assetTimestamp(js/vendors.js)"></script>
  <script src="@assetTimestamp(js/app.js)"></script>
  @yield('scripts')
</body>
</html>
