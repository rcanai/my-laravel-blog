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
          <a href="{{url('accounts')}}">@lang('route.managements')</a>
        </li>
        <li>
          <a href="{{url('style-example')}}">@lang('route.style_example')</a>
        </li>
        <li class="dummy"></li>
      </ul>
    </nav>
  </div>
</header>
