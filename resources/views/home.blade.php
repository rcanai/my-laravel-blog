@extends('_layouts.master')

@section('title')
@lang('route.home') |&nbsp;
@endsection

@section('styles')
{{--  --}}
@endsection

@section('content')
<div>
  <article>
    <header>
      <h1>@lang('最新の記事')</h1>
    </header>
    <section>
      <ul>
        @foreach($posts as $post)
        <li>
          <a href="{{url('archives', $post->id)}}">{{ $post->title }}</a>
          <div>{!! $post->content_html !!}</div>
        </li>
        @endforeach
      </ul>
    </section>
    <footer>
      {{--  --}}
    </footer>
  </article>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
