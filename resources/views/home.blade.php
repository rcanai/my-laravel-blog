@extends('_layouts.master')

@section('title')
@lang('route.home') |&nbsp;
@endsection

@section('styles')
<link href="@assetTimestamp(css/home.css)" rel="stylesheet">
@endsection

@section('content')
<div>
  <article>
    <header>
      <h1>@lang('最新の記事')</h1>
    </header>
    <section>
        @include('archives.posts')
    </section>
    <footer>
      <a href="{{url('archives')}}">@lang('label.show_more')</a>
    </footer>
  </article>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
