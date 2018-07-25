<!DOCTYPE html>
<html lang="{{$language}}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="author" content="rcanai">
  <meta name="csrf-token" content="{{csrf_token()}}">
  <title>@yield('title') My Laravel blog</title>
  <link rel="icon" href="{{asset('favicon.ico')}}">
  <link href="@assetTimestamp(css/app.css)" rel="stylesheet">
  @yield('styles')
</head>
<body>

  @include('_layouts.header')

  <main id="main">
    <div class="container">
      @yield('content')
    </div>
  </main>

  @include('_layouts.aside')

  @include('_layouts.footer')

  @include('_layouts.move_page_top')

  {{-- manifestだけを読み込めばvuejsなどは入ってこない --}}
  <script src="@assetTimestamp(js/manifest.js)" defer></script>
  <script src="@assetTimestamp(js/app.js)" defer></script>
  @yield('scripts')

</body>
</html>
