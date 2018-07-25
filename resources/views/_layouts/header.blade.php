<header id="header">
  <div class="container">
    <div class="app-title">
      <a href="{{url('/')}}">My Laravel blog</a>
    </div>
    <nav>
      <ul>
        <li>
          <a href="{{route('home')}}">@lang('route.home')</a>
        </li>
        <li>
          <a href="{{route('archives')}}">@lang('route.archives')</a>
        </li>
        <li>
          <a href="{{route('search')}}">@lang('route.search')</a>
        </li>
        <li>
          <a href="{{route('contacts')}}">@lang('route.contacts')</a>
        </li>
        <li>
          <a href="{{route('admin')}}">@lang('route.admin')</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
