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
      <ul class="post-list">
        @foreach($posts as $post)
          <li class="post-list-item">
            <a href="{{url('archives', $post->id)}}" class="post-title">{{ $post->title }}</a>
            <time datetime="{{$post->updated_at}}">{{$post->updated_at->format('Y/m/d H:i:s')}}</time>
            <div class="post-images">
              @foreach($post->images as $image)
                <img src="{{$image->url}}" alt="IMAGE">
              @endforeach
            </div>
            <div class="post-content">
              {{ $post->content }}
            </div>
            <a href="{{url('archives', $post->id)}}" class="read-post">@lang('label.read_post')</a>
          </li>
        @endforeach
      </ul>
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
