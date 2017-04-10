# url-shortener
A microservice for shortening urls

## Example creation usage:

```url
https://little-url.herokuapp.com/new/https://www.google.com
https://little-url.herokuapp.com/new/http://foo.com:80
```

## Example creation output:

```json
{ "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }
```

## Usage:

```url
https://little-url.herokuapp.com/2871
```

## Will redirect to:

```url
https://www.google.com/
```

