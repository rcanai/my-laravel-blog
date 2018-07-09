@extends('_layouts.master')

@section('title')
{{$post->title}} |&nbsp;
@endsection

@section('styles')
{{--  --}}
@endsection

@section('content')
<article>
  <header>
    <h1>{{$post->title}}</h1>
    <time datetime="{{$post->updated_at}}">{{$post->updated_at->format('Y/m/d H:i:s')}}</time>
  </header>
  <section>
    {!! $post->content_html !!}
  </section>
  <footer>
    <ul>
      @foreach($post->comments as $comment)
      <li>
          {{$comment->content}}
      </li>
      @endforeach
    </ul>
  </footer>
</article>
<a href="{{url('archives')}}">@lang('記事一覧へ')</a>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/archives/show.js)" defer></script>
@endsection
