<?php
// app/Filament/Resources/ArticleResource.php

namespace App\Filament\Resources;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\ImageColumn;
use App\Filament\Resources\ArticleResource\Pages;



class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Articles';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Informations principales')->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Titre')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn(string $operation, $state, Forms\Set $set) =>
                        $operation === 'create' ? $set('slug', \Illuminate\Support\Str::slug($state)) : null
                    ),

                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(Article::class, 'slug', ignoreRecord: true),

                Forms\Components\Textarea::make('excerpt')
                    ->label('Extrait')
                    ->required()
                    ->maxLength(500)
                    ->rows(3),
            ])->columns(2),

            Forms\Components\Section::make('Contenu')->schema([
                Forms\Components\RichEditor::make('content')
                    ->label('Contenu')
                    ->required()
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Médias et Classification')->schema([
                // ✅ UPLOAD CORRIGÉ - Sans validation maxSize problématique
                FileUpload::make('image')
                    ->label('Image mise en avant')
                    ->image()
                    ->directory('articles')
                    ->disk('public')  // ✅ Utiliser disk public explicitement
                    ->visibility('public')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->imageEditor()  // ✅ Éditeur d'image intégré
                    ->imageCropAspectRatio('16:9')
                    ->imageResizeTargetWidth('800')
                    ->imageResizeTargetHeight('450'),

                Forms\Components\Select::make('category_id')
                    ->label('Catégorie')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('name')->required()->maxLength(255),
                        Forms\Components\TextInput::make('slug')->required()->maxLength(255),
                    ]),

                Forms\Components\Select::make('user_id')
                    ->label('Auteur')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->default(fn() => Auth::id())
                    ->required(),
            ])->columns(3),

            Forms\Components\Section::make('Publication')->schema([
                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'draft' => 'Brouillon',
                        'published' => 'Publié',
                        'archived' => 'Archivé',
                    ])
                    ->default('draft')
                    ->required(),

                Forms\Components\Toggle::make('is_featured')
                    ->label('Article à la une')
                    ->default(false),

                Forms\Components\DateTimePicker::make('published_at')
                    ->label('Date de publication')
                    ->default(now()),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // ✅ IMAGE COLUMN CORRIGÉE
                ImageColumn::make('featured_image')
                    ->label('image')
                    ->disk('public')  // ✅ Disk explicite
                    ->circular()
                    ->defaultImageUrl(fn($record) => 'https://ui-avatars.com/api/?name=' . urlencode($record->title ?? 'Article') . '&background=ede9fe&color=7c3aed&size=400')
                    ->size(60),

                Tables\Columns\TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable()
                    ->limit(30),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Catégorie')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Auteur')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'draft' => 'gray',
                        'published' => 'success',
                        'archived' => 'danger',
                    }),

                Tables\Columns\ToggleColumn::make('is_featured')
                    ->label('À la une'),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Publication')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'draft' => 'Brouillon',
                        'published' => 'Publié',
                        'archived' => 'Archivé',
                    ]),

                Tables\Filters\SelectFilter::make('category')
                    ->label('Catégorie')
                    ->relationship('category', 'name'),

                Tables\Filters\SelectFilter::make('user')
                    ->label('Auteur')
                    ->relationship('user', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}
