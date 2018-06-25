<!DOCTYPE html>
<html lang="{{$language}}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrf-token" content="{{csrf_token()}}">
  <title>@yield('title') My Laravel base</title>
  <link rel="icon" href="{{asset('favicon.ico')}}">
  <link href="@assetTimestamp(css/app.css)" rel="stylesheet">
  @yield('styles')
</head>
<body>
  <input type="hidden" id="app-url" value="{{url('/')}}" style="display:none;">
  <input type="hidden" id="api-url" value="{{url('/_api')}}" style="display:none;">
  <input type="hidden" id="app-timezone" value="{{$language}}" style="display:none;">

  <div class="body-container">

    @auth
      @include('_layouts.header')
    @endauth

    <main id="main">

      <div id="app" class="main-container" v-cloak>
        @yield('content')
      </div>

    </main>

  </div>

   @include('_layouts.move_page_top')

  @include('_layouts.footer')

  <script src="@assetTimestamp(js/manifest.js)"></script>
  <script src="@assetTimestamp(js/vendors.js)"></script>
  <script src="@assetTimestamp(js/app.js)"></script>
  @yield('scripts')
</body>
</html>
